import { NextApiRequest } from "@/core/types";
import { NextApiHandler, NextApiResponse } from "next";

export const onlyAdmin = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const userRole = req.user?.role;
  const allowed = userRole === "admin";
  if (allowed) {
    return handler(req, res);
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};
