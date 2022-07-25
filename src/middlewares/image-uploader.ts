import { Request } from "express";

import config from "../config/config";
import path from "path";
import multerS3 from "multer-s3";
import multer from "multer";
import AWS from "aws-sdk";

type FileNameCallback = (error: Error | null, key: string) => void;

AWS.config.update({
  accessKeyId: config.aws.access_key_id,
  secretAccessKey: config.aws.access_secret,
  region: config.aws.region,
});

const s3 = new AWS.S3();

export const imageuploader = multer({
  storage: multerS3({
    s3: <any>s3,
    bucket: <any>config.aws.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, //객체 url 선택시 자동다운로드를 방지해준다
    acl: "public-read",
    key: function (
      req: Request,
      file: Express.MulterS3.File,
      cb: FileNameCallback
    ) {
      cb(null, `custom/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .mp4 and .jpeg format allowed!")); //나중에 체크 mp4
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const multiimageuploader = multer({
  storage: multerS3({
    s3: <any>s3,
    bucket: <any>config.aws.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, //객체 url 선택시 자동다운로드를 방지해준다
    acl: "public-read",
    key: function (
      req: Request,
      file: Express.MulterS3.File,
      cb: FileNameCallback
    ) {
      cb(null, `store/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .mp4 and .jpeg format allowed!")); //나중에 체크 mp4
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});