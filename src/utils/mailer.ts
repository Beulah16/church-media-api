import { config } from "dotenv";
import nodemailer from "nodemailer";

config();


export const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: parseInt(process.env.SMPT_PORT!),
  auth: {
    user: process.env.SMPT_USERNAME!,
    pass: process.env.SMPT_PASSWORD!,
  }
});