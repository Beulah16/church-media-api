import { Request, Response } from "express";
import { Ministration } from "../models/Ministration";

export const create = async (req: Request, res: Response) => {

    const response = await Ministration.save(req.body);
    
    res.json(response);
};

// export const getMinistrations = async (_req: Request, res: Response) => {
//     const ministrations = await AppDataSource.manager.find(Ministration);
//     return res.json(ministrations);
// };
