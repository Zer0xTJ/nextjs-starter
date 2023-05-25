import envConfig from "@/core/config.env";
import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const mongoDB = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  // create new connection
  await mongoose
    .connect(envConfig.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

  // return the handler
  return handler(req, res);
};

export default mongoDB;
