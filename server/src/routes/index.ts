import express from "express";
import authRoute from "@/routes/AuthRoute";
import eventRoute from "@/routes/EventRoute";
import ticketRoute from '@/routes/TicketRoute'

const router = express.Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/ticket", ticketRoute)

export default router;
