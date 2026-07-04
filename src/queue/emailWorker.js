import { Worker } from "bullmq";
import { sendEmail } from "../config/sendEmail.js";
import { redisConnection } from "../config/redis.js";

new Worker(
    "emailQueue",
    async (job) => {
        console.log(job)
        await sendEmail(job.data)
    },
    {
        connection: redisConnection
    }
)