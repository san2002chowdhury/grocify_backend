import dotenv from "dotenv/config";
import Redis from "ioredis";

export const redisConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
})