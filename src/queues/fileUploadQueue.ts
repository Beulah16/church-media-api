import { Queue } from "bullmq";
import { connection } from "../utils/redisConnection";

export const fileUploadQueue = new Queue('fileUploadQueue', { connection });