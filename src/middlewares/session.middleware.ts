import envConfig from "@/core/config.env";
import { withIronSession } from "next-iron-session";

export default function sessionMiddleware(handler: any) {
  return withIronSession(handler, {
    password: envConfig.SECRET_COOKIE_PASSWORD,
    cookieName: envConfig.COOKIE_NAME,
    cookieOptions: {
      secure: envConfig.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  });
}
