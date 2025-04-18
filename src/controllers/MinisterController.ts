import { Request, Response } from "express";
import { Minister } from "../models/Minister";

export const getAllMinisters = async (req: Request, res: Response) => {

    const ministers = await Minister.find()

    res.json(ministers);
}

export const createMinister = async (req: Request, res: Response) => {

    const response = await Minister.save(req.body);
    res.json(response);
};

export const getOneMinister = async (req: Request, res: Response) => {

    const { id } = req.params;

    const minister = await Minister.findOneBy({ id });
    if (!minister)
        res.json({ message: "Minister not found" });

    res.json({ minister })
}

export const updateMinister = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { name } = req.body;

    const minister = await Minister.findOneBy({ id });
    if (!minister) {
        res.json({ message: "Minister not found" });
    }
    else {
        minister.name = name;
        await minister.save();
        res.json({ minister });
    }
}

export const deleteMinister = async (req: Request, res: Response) => {

    const { id } = req.params;
    const minister = await Minister.findOneBy({ id });
    if (!minister) {
        res.json({ message: "Minister not found" });
    }
    else {
        minister.softRemove();

        res.json({ message: "Minister deleted successfulyy" });
    }

};
