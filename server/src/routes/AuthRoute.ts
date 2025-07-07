import { Router } from "express";
import passport from "passport";
import * as authContoller from "@/controllers/AuthController";
import { CLIENT_URL } from "@/constants/dotenv";
import { tokenMiddleware } from "@/middlewares/TokenMiddleware";

const route = Router();

route.get("/signin", passport.authenticate("google", { scope: ["profile", "email"] }));

route.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${CLIENT_URL}/signin?error=oauth`,
    }),
    authContoller.callbackUrl,
);

route.get("/credential", tokenMiddleware, authContoller.credential);

export default route;
