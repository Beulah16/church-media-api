import { faker } from '@faker-js/faker';
import { Category } from '../models/Category';
import { Year } from '../models/Year';
import { Ministration } from '../models/Ministration';
import { MediaType, MinistrationType } from '../types';
import { Minister } from '../models/Minister';



export class DatabaseSeeder {
    static async create(numMinistartions: number = 10) {
        console.log(`🌱 Seeding ${numMinistartions} ministartions...`);

        // Clean tables
        await Ministration.delete({});
        await Category.delete({});
        await Year.delete({});
        await Minister.delete({});

        // Seed categories
        const categories: Category[] = [];
        const nameSet = new Set<string>();
        for (let i = 0; i < 11; i++) {
            const categoryName = faker.commerce.department();
            // Ensure unique category names
            if (!nameSet.has(categoryName)) {
                nameSet.add(categoryName);

                const category = new Category();
                category.name = categoryName;
                categories.push(await Category.save(category));
            }
        }

        // Seed years
        const years: Year[] = [];
        for (let i = 0; i < 13; i++) {
            const year = new Year();
            year.name = (2013 + i).toString();
            years.push(await Year.save(year));
        }

        const ministers: Minister[] = [];
        for (let i = 0; i < 10; i++) {
            const minister = new Minister();
            minister.name = faker.name.fullName();
            ministers.push(await Minister.save(minister));
        }

        // Seed ministartions
        for (let i = 0; i < numMinistartions; i++) {
            const ministartion = new Ministration();
            ministartion.title = faker.lorem.sentence();
            ministartion.code = `MSG${faker.number.int({ min: 1000, max: 9999 })}`;
            ministartion.description = faker.lorem.paragraphs(2);         
            ministartion.minister = faker.helpers.arrayElement(ministers);
            ministartion.ministeredOn = faker.date.between({ from: new Date('2020-01-01'), to: new Date('2023-12-31')});
            ministartion.category = faker.helpers.arrayElement(categories);
            ministartion.year = faker.helpers.arrayElement(years);
            ministartion.url = faker.internet.url();


            ministartion.ministrationType = faker.helpers.arrayElement([
                MinistrationType.MESSAGE,
                MinistrationType.SONG,
                MinistrationType.TESTIMONY,
                MinistrationType.SHOW,
            ]);

            ministartion.mediaType = faker.helpers.arrayElement([
                MediaType.VIDEO,
                MediaType.AUDIO,
                MediaType.PDF,
            ]);

            await Ministration.save(ministartion);
        }

        console.log('✅ Done seeding.');
    }
}