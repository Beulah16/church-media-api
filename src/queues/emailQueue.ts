import { Queue } from 'bullmq';
import { connection } from '../utils/redisConnection';

export const emailQueue = new Queue('emailQueue', {connection});