import { Request, Response } from "express";
import { Ministration } from "../models/Ministration";
import { plainToInstance } from "class-transformer";
import { MinistrationResponseDto } from "../DTOs/ministration.dto";
import { Minister } from "../models/Minister";
import { Category } from "../models/Category";
import { Year } from "../models/Year";
import {filterMinistrationBy} from '../helpers'


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


    const { minister: ministerId, category: categoryId, year: yearId } = req.body;
    
    const minister = await Minister.findOneBy({ id: ministerId });
    if (!minister) {
        res.status(400).json({ message: "Minister not found" });
        return;
    }

    const category = await Category.findOneBy({id: categoryId});
    if (!category) {
        res.status(400).json({ message: "Category not found" });
        return;
    }

    const year = await Year.findOneBy({id: yearId});
    if (!year) {
        res.status(400).json({ message: "Year not found" });
        return;
    }

    const response = await Ministration.save(req.body);
    
    res.json(response);
};



export const getOneMinistration = async (req: Request, res: Response) => {

    const { id } = req.params;

    const ministration = await Ministration.findOneBy({ id });
    if (!ministration)
        res.json({ message: "Ministration not found" });

    res.json({ ministration })
}

export const updateMinistration = async (req: Request, res: Response) => {

    const { id } = req.params;
    const body = req.body;

    const ministration = await Ministration.findOneBy({ id });
    if (!ministration) {
        res.json({ message: "Ministration not found" });
    }
    else {
        const ministrationData = { ...ministration, ...body }

        await ministrationData.save();
        res.json({ ministration });
    }
}

export const deleteMinistration = async (req: Request, res: Response) => {

    const { id } = req.params;
    const ministration = await Ministration.findOneBy({ id });
    if (!ministration) {
        res.json({ message: "Ministration not found" });
    }
    else {
        ministration.softRemove();

        res.json({ message: "Ministration deleted successfulyy" });
    }

};


