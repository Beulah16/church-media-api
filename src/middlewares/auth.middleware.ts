import { NextFunction, Request, Response } from "express";
import { JWT } from "../helpers/jwt";
import { User } from "../models/User";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });

        return;
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });

        return;
    }

    try {
        ;
        req.user = JWT.verifyToken(token) as User;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }

}