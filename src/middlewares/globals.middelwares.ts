import { NextApiHandler, NextApiResponse } from "next";
import mongoDB from "./mongodb.middleware";
import Log from "./log.middleware";
import sessionMiddleware from "./session.middleware";
import userMiddleware from "./user.middleware";
import { NextApiRequest } from "@/core/types";

type MiddlewaresContainer = {
  [key: string]: (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
};

// this variable will be store all middlewares
const middlewaresContainer: MiddlewaresContainer = {
  sessionMiddleware,
  mongoDB,
  userMiddleware,
  Log,
};

const wrapedMiddlewares: string[] = ["sessionMiddleware", "mongoDB", "userMiddleware", "Log"];

const globalMiddlewares = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  for (const middleware in middlewaresContainer) {
    if (!wrapedMiddlewares.includes(middleware)) continue;
    handler = middlewaresContainer[middleware](handler);
  }
  return handler(req, res);
};

export { globalMiddlewares };
