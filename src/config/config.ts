import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;

const MONGO = {
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`
};

const SERVER = {
    local: process.env.LOCAL,
    host1: process.env.SERVER_HOST1,
    host2: process.env.SERVER_HOST2,
    host3: process.env.SERVER_HOST3,
    host4: process.env.SERVER_HOST4,
    port: process.env.SERVER_PORT
};

const SOCIAL = {
    naver_id: process.env.NAVER_ID,
    naver_url: process.env.NAVER_URL,
    naver_secret: process.env.NAVER_SECRET,

    kakao_id: process.env.KAKAO_ID,
    kakao_url: process.env.KAKAO_URL
};

const AWS = {
    access_key_id: process.env.AWS_ACCESS_KEY_ID,
    access_secret: process.env.AWS_ACCESS_SECRET,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET
};

const JWT = {
    secretKey: process.env.JWT_SECRET
};

const config = {
    mongo: MONGO,
    server: SERVER,
    aws: AWS,
    jwt: JWT,
    social: SOCIAL
};

export default config;
