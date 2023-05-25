import type { NextApiHandler, NextApiResponse } from "next";
import multer from "multer";
import { NextApiRequest } from "@/core/types";

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("invalid-file-type"));
    }
  },
}).array("images");

const memoryUploadImagesMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse | any) => {
  await new Promise<void>((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return handler(req, res);
};

export default memoryUploadImagesMiddleware;
