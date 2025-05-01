import { body, checkSchema } from "express-validator";
import { MediaType, MinistrationType } from "../types";
import { findDataById } from "../helpers";
import { Minister } from "../models/Minister";
import { Year } from "../models/Year";
import { Category } from "../models/Category";

export const validateMinistrationRequest = checkSchema({
    title: {
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: 'title is required',
    },
    code: {
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: 'code is required',
    },
    description: {
        optional: { options: { nullable: true } },
        trim: true,
        escape: true,
        errorMessage: 'description must be a string',
    },
    minister: {
        notEmpty: true,
        trim: true,
        isUUID: true,
        custom: {
            options: async (value, { req }) => {
                const minister = await findDataById(Minister, value);
                if (!minister) {
                    throw new Error('ministerId does not exist');
                }
                return true;
            },

        },
        errorMessage: 'ministerId is required',
    },
    ministeredOn: {
        notEmpty: true,
        isDate: true,
        errorMessage: 'ministeredOn is required and must be a date in YYYY-MM-DD format',
    },
    category: {
        notEmpty: true,
        trim: true,
        isUUID: true,
        custom: {
            options: async (value, { req }) => {
                const category = await findDataById(Category, value);
                if (!category) {
                    throw new Error('categoryId does not exist');
                }
                return true;
            },

        },
        errorMessage: 'categoryId is required',
    },
    year: {
        notEmpty: true,
        trim: true,
        isUUID: true,
        custom: {
            options: async (value, { req }) => {
                const year = await findDataById(Year, value);
                if (!year) {
                    throw new Error('yearId does not exist');
                }
                return true;
            },

        },
        errorMessage: 'yearId is required',
    },
    mediaType: {
        notEmpty: true,
        trim: true,
        isIn: {
            options: [Object.values(MediaType)],
            errorMessage: `mediaType must be one of the following: ${Object.values(MediaType).join(', ')}`,
        },
    },
    ministrationType: {
        notEmpty: true,
        trim: true,
        isIn: {
            options: [Object.values(MinistrationType)],
            errorMessage: `ministrationType must be one of the following: ${Object.values(MinistrationType).join(', ')}`,
        },
    },
    url: {
        notEmpty: true,
        trim: true,
        isURL: true,
        errorMessage: 'url must be a valid URL',
    },
}, ['body']);