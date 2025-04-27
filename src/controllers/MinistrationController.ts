import { Request, Response } from "express";
import { Ministration } from "../models/Ministration";
import { plainToInstance } from "class-transformer";
import { MinistrationResponseDto } from "../DTOs/ministration.dto";
import { Between, FindOptionsWhere, ILike } from "typeorm";


export const getAllMinistrations = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.per_page as string) || 10;
    const skip = (page - 1) * limit;

    const { title, minister, category, year, start_date, end_date } = req.query;

    const where: FindOptionsWhere<Ministration> = {};

    if (title) {
        where.title = ILike(`%${title}%`);
    }

    if (minister) {
        where.minister = { name: ILike(`%${minister}%`) };
    }

    if (category) {
        where.category = { name: ILike(`%${category}%`) };
    }

    if (year) {
        where.year = {name: ILike(`%${year}%`) };
    }

    if (start_date && end_date) {
        where.ministeredOn = Between(new Date(start_date as string), new Date(end_date as string));
    } else if (start_date) {
        where.ministeredOn = Between(new Date(start_date as string), new Date());
    } else if (end_date) {
        where.ministeredOn = Between(new Date('1970-01-01'), new Date(end_date as string));
    }

    const [rawMinistrations, total] = await Ministration.findAndCount({
        where,
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
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


