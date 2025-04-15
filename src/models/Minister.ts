import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Ministration } from "./Ministration";

@Entity("ministers")
export class Minister extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Ministration, (ministration) => ministration.minister)
    @JoinColumn({ name: "ministration_id" })
    ministrations: Ministration[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt: Date;

}
