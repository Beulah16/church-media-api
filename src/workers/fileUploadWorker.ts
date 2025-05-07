import { Job, Worker } from "bullmq";
import { cloudinary } from "../helpers";
import fs from "fs";
import { connection } from "../utils/redisConnection";
import { Ministration } from "../models/Ministration";

const fileUploadWorker = new Worker(
    'fileUploadQueue',
    async (job: Job) => {
        const response = await cloudinary().upload(job.data.filePath, { folder: "ministrations" });

        const ministration = job.data.ministration as Ministration;
        ministration.thumbnail = response.url;
        
        await ministration.save();
        
        fs.unlinkSync(job.data.filePath);

    },
    { connection }
);

fileUploadWorker.on('completed', (job: Job) => {
    console.log("File uplaoded successfully");
});

fileUploadWorker.on('failed', (job, err) => {
    console.log("File failed to send", "Error:", err.message);
});