"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageuploader = void 0;
const config_1 = __importDefault(require("../config/config"));
const path_1 = __importDefault(require("path"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: config_1.default.aws.access_key_id,
    secretAccessKey: config_1.default.aws.access_secret,
    region: config_1.default.aws.region,
});
const s3 = new aws_sdk_1.default.S3();
exports.imageuploader = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: config_1.default.aws.bucket,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: function (req, file, cb) {
            cb(null, `custom/${Date.now()}${path_1.default.basename(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg, .mp4 and .jpeg format allowed!")); //나중에 체크 mp4
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 },
});
