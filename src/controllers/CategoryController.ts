import { Request, Response } from "express";
import { Category } from "../models/Category";

export const create = async (req: Request, res: Response) => {

    const response = await Category.save(req.body)
    res.json(response);
};

// export const getCategorys = async (_req: Request, res: Response) => {
//     const categorys = await AppDataSource.manager.find(Category);
//     return res.json(categorys);
// };
