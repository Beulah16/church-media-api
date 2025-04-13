import { config } from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";

config();

const app = express();

const PORT = process.env.PORT;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.listen(PORT, () => console.log(`App is listening on ${PORT}`))
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));
