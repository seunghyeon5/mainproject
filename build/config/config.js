"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;
const MONGO = {
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`
};
//const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER = {
    // hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const SOCIAL = {
    google_id: process.env.GOOGLE_ID,
    google_url: process.env.GOOGLE_URL,
    google_secret: process.env.GOOGLE_SECRET,
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
exports.default = config;