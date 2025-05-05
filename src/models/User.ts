import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../types";
import { BaseNotification } from "../notifications/BaseNotification";
import { transport } from "../utils/mailer";
import { emailQueue } from "../queues/emailQueue";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "full_name" })
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt: Date;

    async notify(notification: BaseNotification) {
        const mailOptions = notification.send(this.email, this);

        await emailQueue.add("sendMail", mailOptions);

        // await transport.sendMail(mailOptions);
    }
}
