import { Router } from "express";
import passport from "passport";
import { AuthController } from "@/controllers/AuthController";
import { CLIENT_URL } from "@/constants/dotenv";
import { tokenMiddleware } from "@/middlewares/TokenMiddleware";

const router = Router();
const authController = new AuthController();

// --- Google OAuth2 ---
router.get("/signin", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${CLIENT_URL}/signin?error=oauth`,
    }),
    authController.callbackUrl
);

// --- Protected Routes ---
router.use(tokenMiddleware);
router.get("/credential", authController.credential);
router.get("/transaction/index", authController.transaction);
router.get("/ticket/index", authController.ticket);
router.get("/conversation/index", authController.conversation);
router.get("/message/index/:conversation_id", authController.message);

export default router;
