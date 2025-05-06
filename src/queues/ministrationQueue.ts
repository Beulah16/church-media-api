import { Queue } from "bullmq";
import { connection } from "../utils/redisConnection";

export const ministrationQueue = new Queue("ministrationQueue", { connection } );