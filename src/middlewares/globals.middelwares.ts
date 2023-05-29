import { NextApiHandler, NextApiResponse } from "next";
import mongoDB from "./mongodb.middleware";
import Log from "./log.middleware";
import sessionMiddleware from "./session.middleware";
import userMiddleware from "./user.middleware";
import { NextApiRequest } from "@/core/types";

const globalMiddlewares = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  // return Log(userMiddleware(sessionMiddleware(mongoDB(handler))))(req, res);
  return mongoDB(sessionMiddleware(userMiddleware(Log(handler))))(req, res);
};

export { globalMiddlewares };
