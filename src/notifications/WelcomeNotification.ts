import { BaseNotification } from "./BaseNotification";

export class WelcomeNotification extends BaseNotification{
    subject(): string {
        return "Welcome to our platform!";
    }

    template(userName: string): string {
        return `Hello ${userName}, welcome to our platform!`;
    }
  
}