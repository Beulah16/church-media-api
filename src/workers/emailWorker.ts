import { Job, Worker } from 'bullmq';
import { connection } from '../utils/redisConnection';

const emailWorker = new Worker(
    'emailWorker',
    async (job: Job) => { 

        console.log('Processing job:', job.id, job.data);
        // Simulate some processing time

        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Job processed:', job.id);
    },
    { connection });

    emailWorker.on('completed', (job: Job) => {
        console.log(`Job ${job.id} completed!`);
    });

    emailWorker.on('failed', (job , err) => {
        console.log(`Job ${job?.id} failed with error: ${err.message}`);
    });