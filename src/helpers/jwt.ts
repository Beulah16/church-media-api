import { config } from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { User } from "../models/User";

config();

export class JWT {
    static generateToken(payload: User): string {
        const secret = process.env.JWT_SECRET!;
        const expiry = process.env.JWT_EXPIRY as StringValue;

        return jwt.sign({ ...payload }, secret, { expiresIn: expiry });
    }

    static verifyToken(token: string): User | null {
        const secret = process.env.JWT_SECRET!;

        return jwt.verify(token, secret) as User;

    }
}
