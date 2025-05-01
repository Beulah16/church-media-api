import { Request, Response } from "express";
import { Ministration } from "../models/Ministration";
import { plainToInstance } from "class-transformer";
import { MinistrationResponseDto } from "../DTOs/ministration.dto";
import { filterMinistrationBy } from '../helpers'


export const getAllMinistrations = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.per_page as string) || 10;
    const skip = (page - 1) * limit;

    const { order_by } = req.query;
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

    res.json({
        user: req.user,
        data: ministrations,
        meta: {
            current_page: page,
            per_page: limit,
            total_pages: Math.ceil(total / limit),
            total_items: total,
        },
    });
};

export const createMinistration = async (req: Request, res: Response) => {

    const ministration = await Ministration.save(req.body);

    res.json({ministration});
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