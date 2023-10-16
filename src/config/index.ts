import { getMongoURI } from "./helpers";

export const getConfig = () => ({
    NODE_ENV: process.env.NODE_ENV || "development",
    BASE: process.env.BASE,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    MONGODB_URI: getMongoURI(process.env),
    REDIS_URL: process.env.REDIS_URL,
    APP_PORT: process.env.APP_PORT,
});

export type Config = ReturnType<typeof getConfig>;
