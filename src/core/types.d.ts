import { SerializedUser } from "@/models/user.model";
import { Session } from "next-iron-session";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export type NextApiRequest = NextApiRequest & {
  session?: Session;
  user: SerializedUser;
  files: {
    images: MulterFile[];
  };
};
