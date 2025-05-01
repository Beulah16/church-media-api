import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types";

export const isAdmin = (req:Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user && user.role === UserRole.ADMIN) {
        next();
    } else {
        res.status(403).json({ message: "FORBIDDEN: You're not allowed to access this route" });
    }
}