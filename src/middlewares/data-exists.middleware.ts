import { NextFunction, Request, Response } from "express";
import { findDataById } from "../helpers";

export const idExists = (model: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const data = await findDataById(model, id);

            if (!data) {
                throw new Error("Data not found");
            }
            req.data = data;
           
            next();
        } catch (error: any) {
            console.log({error});
            const statusCode = error.message === "Data not found" ? 404 : 500;
            res.status(statusCode).json({ message: error.message });
        }
    };
}