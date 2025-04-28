// dto/MinistrationResponseDto.ts
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { format } from 'date-fns';
import { MediaType, MinistrationType } from '../types';

export class MinistrationResponseDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    code: string;

    @Expose()
    @Transform(({ obj }) => obj.minister?.name)
    ministerName: string;

    @Expose()
    @Transform(({ obj }) => obj.category?.name)
    categoryName: string;

    @Expose()
    @Transform(({ obj }) => obj.year?.name)
    yearName: string;

    @Expose()
    mediaType: string;

    @Expose()
    MinistrationType: string;

    @Expose()
    @Transform(({ value }) => format(new Date(value), "EEE do MMM. yyyy, h:mma"))
    createdAt: string;

    @Expose()
    @Transform(({ value }) => format(new Date(value), "EEE do MMM. yyyy, h:mma"))
    ministeredOn: string;

    @Expose()
    description: string;

    @Expose()
    url: string;

    @Exclude()
    updatedAt: Date;
}

export class MinistrationRequestDto {
    @IsNotEmpty({ message: 'Title is required' })
    @Transform(({ value }) => value.trim())
    title: string;
    
    @IsNotEmpty({ message: 'code is required' })
    @Transform(({ value }) => value.trim())
    code: string;

    @IsNotEmpty({ message: 'description is required' })
    @Transform(({ value }) => value.trim())
    description: string;

    @IsNotEmpty({ message: 'minister is required' })
    @Transform(({ value }) => value.trim())
    minister: string;

    @IsNotEmpty({ message: 'category is required' })
    @Transform(({ value }) => value.trim())
    category: string;

    @IsNotEmpty({ message: 'year is required' })
    @Transform(({ value }) => value.trim())
    year: string;

    @IsNotEmpty({ message: 'mediaType is required' })
    @Transform(({ value }) => value.trim())
    @IsEnum(MediaType, { message: `mediaType must be one of the following: ${Object.values(MediaType).join(', ')}` })
    mediaType: string;

    @IsNotEmpty({ message: 'ministrationType is required' })
    @Transform(({ value }) => value.trim())
    @IsEnum(MinistrationType, { message: `ministrationType must be one of the following: ${Object.values(MinistrationType).join(', ')}` })
    ministrationType: string;

    @IsNotEmpty({ message: 'url is required' })
    @Transform(({ value }) => value.trim())
    @IsUrl({}, { message: 'url must be a valid URL' })
    url: string;

    @IsNotEmpty({ message: 'ministeredOn is required' })
    ministeredOn: Date;
}