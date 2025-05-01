import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_TOKEN as string;

export const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: parseInt(process.env.MAILTRAP_TEST_INBOX_ID as string)
  })
);

// const sender = {
//   address: "hello@example.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   "igboanugobeulah20@gmail.com",
// ];