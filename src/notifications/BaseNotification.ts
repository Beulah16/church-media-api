export abstract class BaseNotification {
    abstract subject(): string;
    abstract template(userName: string): string;

    send(to: string, data: any) {
        return {
                from: process.env.MAILTRAP_SENDER as string,
                to,
                subject: this.subject(),
                text: this.template(data.fullName),
                // category: "Integration Test",
                // sandbox: true
        }
    }

}