import { config } from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import apiEndPoints from "./routes"
import { DatabaseSeeder } from "./seeders/data.seeder";

config();

const app = express();

app.use(express.json())

app.use('/api', apiEndPoints)

const PORT = process.env.PORT;

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");

        // await DatabaseSeeder.create(200);

        app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));
