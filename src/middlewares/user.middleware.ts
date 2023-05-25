import { NextApiRequest } from "@/core/types";
import { NextApiHandler, NextApiResponse } from "next";

const userMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await req.session?.get("user");
  req.user = user;
  return handler(req, res);
};

export default userMiddleware;
