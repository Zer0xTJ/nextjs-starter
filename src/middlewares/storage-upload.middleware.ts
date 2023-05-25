import type { NextApiHandler, NextApiResponse } from "next";
import multer from "multer";
import { NextApiRequest } from "@/core/types";
import path from "path";

const uploadMiddleware = (uploadPath: string) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(new Error("invalid-file-type"));
      }
    },
  }).array("images");

const storageUploadImagesMiddleware = (handler: NextApiHandler, uploadPath: string) => async (req: NextApiRequest, res: NextApiResponse | any) => {
  await new Promise<void>((resolve, reject) => {
    uploadMiddleware(uploadPath)(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return handler(req, res);
};

export default storageUploadImagesMiddleware;
