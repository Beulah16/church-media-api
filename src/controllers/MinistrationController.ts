import { Request, Response } from "express";
import { Ministration } from "../models/Ministration";
import { plainToInstance } from "class-transformer";
import { MinistrationResponseDto } from "../DTOs/ministration.dto";

export const getAllMinistrations = async (req: Request, res: Response) => {

    const rawMinistrations = await Ministration.find()
    const ministrations = plainToInstance(MinistrationResponseDto, rawMinistrations, {
        excludeExtraneousValues: true,
    });

    res.json(ministrations);
}

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
    const { title, code, minister, category, year, mediaType, ministartionType } = req.body;

    const ministration = await Ministration.findOneBy({ id });
    if (!ministration) {
        res.json({ message: "Ministration not found" });
    }
    else {
        ministration.title = title;
        ministration.code = code;
        ministration.minister = minister;
        ministration.category = category;
        ministration.mediaType = mediaType;
        ministration.ministartionType = ministartionType;

        await ministration.save();
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


