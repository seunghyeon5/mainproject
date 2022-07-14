import dotenv from "dotenv";

dotenv.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;

const MONGO = {
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`
};

const KAKAO_ID = process.env.KAKAO_ID;
const KAKAO_URL = process.env.KAKAO_URL;
//const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER = {
    // hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const AWS = {
    access_key_id: process.env.AWS_ACCESS_KEY_ID,
    access_secret: process.env.AWS_ACCESS_SECRET,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET
};
const config = {
    mongo: MONGO,
    server: SERVER,
    aws: AWS,
    jwt: process.env.JWT_SECRET
};

export default config;
