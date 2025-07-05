import { Router } from "express";
import { callbackUrl } from "@/controllers/AuthController";
import passport from "passport";
import { CLIENT_URL } from "@/constants/dotenv";

const route = Router();

route.get(
  "/signin",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/signin?error=oauth`,
  }),
  callbackUrl,
);

export default route;
