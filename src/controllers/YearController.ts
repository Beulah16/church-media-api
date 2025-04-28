import { Request, Response } from "express";
import { Year } from "../models/Year";

export const getAll = async (req: Request, res: Response) => {

    const years = await Year.find({
        order: { name: "DESC"}
    })
    res.json(years);
};

export const create = async (req: Request, res: Response) => {

    const response = await Year.save(req.body)

    res.json(response);
}

export const getOne = async (req: Request, res: Response) => {

    const { id } = req.params;

    const year = await Year.findOneBy({ id });
    if (!year) {
        res.json({ message: "Year not found" })
        return
    }

    res.json(year);
};

export const update = async (req: Request, res: Response) => {

    const { id } = req.params;
    const {name} = req.body;

    try {
        const year = await Year.findOneBy({ id });
        if (!year) {
            res.json({ message: "Year not found" })
            return
        }
        year.name = name;
        await year.save();
        res.json({ message: "Year updated successfully" });
    } 
    catch (err: any) {
        console.log({error: err.message})
        res.json({ message: err.message });
    }

};


export const remove = async (req: Request, res: Response) => {

    const { id } = req.params;

    const year = await Year.findOneBy({ id });
    if (year)
    {
        await year.softRemove();
        res.json({ message: "Year deleted successfully" });
    }
    else {
        res.json({ message: "Year does not exist" });
    }
};