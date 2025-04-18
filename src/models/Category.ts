import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from "typeorm";
import { Ministration } from "./Ministration";

@Entity("categories")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    name: string;

    @OneToMany(() => Ministration, (ministration) => ministration.category)
    ministrations: Ministration[];

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", nullable: true})
    updatedAt: Date;

    @DeleteDateColumn({name: "deleted_at", nullable: true})
    deletedAt: Date;
    
}
