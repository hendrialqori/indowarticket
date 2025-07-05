import express from "express";
import authRoute from "@/routes/AuthRoute";

const router = express.Router();

router.use("/auth", authRoute);

export default router;
