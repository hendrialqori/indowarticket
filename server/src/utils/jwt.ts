import jwt from "jsonwebtoken";
import { JWT_ACCESS_KEY } from "@/constants/dotenv";

export const generateToken = (user: Express.User): string => {
  return jwt.sign(user, String(JWT_ACCESS_KEY), {
    expiresIn: "15m",
  });
};
