import express from "express";
import authRoute from "@/routes/AuthRoute";
import eventRoute from "@/routes/EventRoute";
import ticketRoute from '@/routes/TicketRoute'
import transactionRoute from '@/routes/TransactionRoute'

const router = express.Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/ticket", ticketRoute)
router.use("/transaction", transactionRoute)

export default router;
