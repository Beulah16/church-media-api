import { BaseNotification } from "./BaseNotification";
import { welcomeEmailTemplate } from "./templates/welcomeEmailTemplate";

export class WelcomeNotification extends BaseNotification{
    subject(): string {
        return "Welcome to our platform!";
    }

    template(userName: string): string {
        return welcomeEmailTemplate(userName);
    }
  
}