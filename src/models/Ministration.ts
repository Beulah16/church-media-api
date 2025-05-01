import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Category } from "./Category";
import { Year } from "./Year";
import { Minister } from "./Minister";
import { MediaType, MinistrationType } from "../types/";

@Entity("ministrations")
export class Ministration extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    code: string;

    @Column({ nullable: true, type: "text" })
    description: string;

    @ManyToOne(() => Minister, (minister) => minister.ministrations, { nullable: true, eager: true })
    @JoinColumn({ name: "minister_id" })
    minister: Minister;

    @Column({ name: "ministered_on" })
    ministeredOn: Date;

    @ManyToOne(() => Category, (category) => category.ministrations, { eager: true })
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToOne(() => Year, (year) => year.ministrations, { eager: true })
    @JoinColumn({ name: "year_id" })
    year: Year;

    @Column({
        type: 'enum',
        enum: MediaType,
        default: MediaType.VIDEO
    })
    mediaType: MediaType;

    @Column({
        type: 'enum',
        enum: MinistrationType,
        default: MinistrationType.MESSAGE
    })
    ministrationType: MinistrationType;

    @Column({ nullable: true })
    url: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt: Date;
}
