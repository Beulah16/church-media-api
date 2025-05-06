import { Job, Worker } from 'bullmq';
import { connection } from '../utils/redisConnection';
import { transport } from '../utils/mailer';

const emailWorker = new Worker(
    'emailQueue',
    async (job: Job) => { 

        console.log('Sending email to', job.data.to);
        await transport.sendMail(job.data);
    },
    { connection });

    emailWorker.on('completed', (job: Job) => {
        console.log("Email sent successfully to", job.data.to);
    });

    emailWorker.on('failed', (job , err) => {
        console.log("Email failed to send to", job?.data.to, "Error:", err.message);
    });