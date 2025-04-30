import { config } from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { User } from "../models/User";

config();

export class JWT {
    static generateToken(payload: User): string {
        const secret = process.env.JWT_SECRET!;
        const expiry = process.env.JWT_EXPIRY as StringValue;

        return jwt.sign({ data: payload }, secret, { expiresIn: expiry });
    }
}
