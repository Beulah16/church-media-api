import { Between, FindOptionsWhere, ILike } from "typeorm";
import {Ministration} from '../models/Ministration'

export function filterMinistrationBy(query: Record<any, any>): FindOptionsWhere<Ministration>{
    const { title, minister, category, year, start_date, end_date } = query;
    
    const where: FindOptionsWhere<Ministration> = {};

    if (title) {
        where.title = ILike(`%${title}%`);
    }

    if (minister) {
        where.minister = { name: ILike(`%${minister}%`) };
    }

    if (category) {
        where.category = { name: ILike(`%${category}%`) };
    }

    if (year) {
        where.year = {name: ILike(`%${year}%`) };
    }

    if (start_date && end_date) {
        where.ministeredOn = Between(new Date(start_date as string), new Date(end_date as string));
    } else if (start_date) {
        where.ministeredOn = Between(new Date(start_date as string), new Date());
    } else if (end_date) {
        where.ministeredOn = Between(new Date('1970-01-01'), new Date(end_date as string));
    }

    return where;
}