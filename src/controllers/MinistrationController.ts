import { Request, Response } from "express";
import { Ministration } from "../models/Ministration";
import { plainToInstance } from "class-transformer";
import { MinistrationResponseDto } from "../DTOs/ministration.dto";
import { cloudinary, filterMinistrationBy, upload } from '../helpers'
import { connection } from "../utils/redisConnection";
import fs from "fs";
import { fileUploadQueue } from "../queues/fileUploadQueue";



export const getAllMinistrations = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { title, minister, category, year, start_date, end_date, order_by } = req.query;

    const cacheKey = `ministrations:${page}-${limit}-${order_by}-${title}-${minister}-${category}-${year}-${start_date}-${end_date}`;
    const cacheDuration = 60;

    const cacheExists = await connection.get(cacheKey);
    if (cacheExists) {
        const cachedData = JSON.parse(cacheExists);
        res.json(cachedData);
        return;
    }

    const order: Record<string, any> = {};
    if (order_by) {
        order[order_by as string] = "DESC";
    } else {
        order.createdAt = "DESC";
    }

    const [rawMinistrations, total] = await Ministration.findAndCount({
        where: filterMinistrationBy(req.query),
        skip,
        take: limit,
        order
    });

    const ministrations = plainToInstance(MinistrationResponseDto, rawMinistrations, {
        excludeExtraneousValues: true,
    });

    const ministrationData = {
        user: req.user,
        data: ministrations,
        meta: {
            current_page: page,
            per_page: limit,
            total_pages: Math.ceil(total / limit),
            total_items: total,
        },
    }

    await connection.setex(cacheKey, cacheDuration, JSON.stringify(ministrationData));
    res.json(ministrationData);
};

export const createMinistration = async (req: Request, res: Response) => {

    if (req.fileValidationError) {
        res.status(422).json({ error: req.fileValidationError });
        return;
    }

    const ministration = await Ministration.save(req.body);

    if (req.file) {
        const uploadResponse = await fileUploadQueue.add("fileUpload", { 
            filePath: req.file.path,
            ministration
        });

        res.json({ uploadResponse });
        return;
    }

    res.json({ ministration });
};

export const getOneMinistration = async (req: Request, res: Response) => {

    const ministration = req.data as Ministration;

    res.json({ ministration })
}

export const updateMinistration = async (req: Request, res: Response) => {

    const body = req.body;
    const ministration = req.data as Ministration;

    const ministrationData = { ...ministration, ...body }

    await ministrationData.save();
    res.json({ ministration });
}

export const deleteMinistration = async (req: Request, res: Response) => {

    const ministration = req.data as Ministration;

    ministration.softRemove();

    res.json({ message: "Ministration deleted successfulyy" });
};