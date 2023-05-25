import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const Log = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  // log [ip] [time] [method] [url] [status] [user-agent]
  console.log(`[${new Date().toLocaleString()}] [${req.socket.remoteAddress}] [${req.method}] [${req.url}] [${res.statusCode}] [${req.headers["user-agent"]}]`);
  return handler(req, res);
};

export default Log;
