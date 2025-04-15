import { Request, Response } from "express";
import { Year } from "../models/Year";

export const create = async (req: Request, res: Response) => {

    const response = await Year.save(req.body)

    res.json(response);
}