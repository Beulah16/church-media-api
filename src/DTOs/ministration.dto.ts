// dto/MinistrationResponseDto.ts
import { Exclude, Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

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

    @Exclude()
    updatedAt: Date;
}