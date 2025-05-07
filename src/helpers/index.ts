import { Between, FindOptionsWhere, ILike } from "typeorm";
import { Ministration } from '../models/Ministration'
import multer from "multer";
import { v2 as Cloudinary } from 'cloudinary'
import { config } from 'dotenv'
import path from "path";
config()

export function filterMinistrationBy(query: Record<any, any>): FindOptionsWhere<Ministration> {
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
        where.year = { name: ILike(`%${year}%`) };
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

export async function findDataById<T>(model: any, id: string): Promise<T | null> {
    return await model.findOneBy({ id });
}

export function upload(): multer.Multer {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    return multer({ 
        storage, 
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (allowedTypes.includes(file.mimetype)) {
              cb(null, true);
            } else {
              cb(null, false);
              req.fileValidationError = 'Only .jpg, .png, .webp images are allowed';
            }
          }
        })
}


export function cloudinary(): typeof Cloudinary.uploader {
    Cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        folder: process.env.CLOUDINARY_FOLDER,
        secure: true,
    });
    return Cloudinary.uploader;
}