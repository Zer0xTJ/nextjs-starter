import { NextApiResponse } from "next";
import UserModel from "@/models/user.model";
import { globalMiddlewares } from "@/middlewares/globals.middelwares";
import { NextApiRequest } from "@/core/types";

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid-credentials" });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid-credentials" });
    }
    const payload = user.serialize();
    // save user session
    req.session.set("user", payload);
    await req.session.save();
    res.status(200).json({ user: payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "invalid-credentials" });
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return await loginUser(req, res);
    default:
      return res.status(405).json({ message: "method-not-allowed" });
  }
}

export default globalMiddlewares(handler as any);
