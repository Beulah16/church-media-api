import { Request, Response } from "express";
import { Category } from "../models/Category";

export const getAll = async (req: Request, res: Response) => {

    const categories = await Category.find()
    res.json(categories);
};

export const create = async (req: Request, res: Response) => {

    const response = await Category.save(req.body)
    res.json(response);
};

export const getOne = async (req: Request, res: Response) => {

    const { id } = req.params;

    const category = await Category.findOneBy({ id });

    res.json(category);
};

export const update = async (req: Request, res: Response) => {

    const { id } = req.params;
    const {name} = req.body;

    try {
        const category = await Category.findOneBy({ id });
        if (!category) {
            res.json({ message: "Category not found" })
            return
        }
        category.name = name;
        await category.save();
        res.json({ message: "Category updated successfully" });
    } 
    catch (err: any) {
        console.log({error: err.message})
        res.json({ message: err.message });
    }

};


export const remove = async (req: Request, res: Response) => {

    const { id } = req.params;

    const category = await Category.findOneBy({ id });
    if (category)
        await category.softRemove();

    res.json({ message: "Category deleted successfully" });
};