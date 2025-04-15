import { Request, Response } from "express";
import { Minister } from "../models/Minister";

export const create = async (req: Request, res: Response) => {

    const response = await Minister.save(req.body);
    res.json(response);
};

// export const getMinisters = async (_req: Request, res: Response) => {
//     const ministers = await AppDataSource.manager.find(Minister);
//     return res.json(ministers);
// };
