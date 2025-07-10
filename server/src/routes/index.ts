import express from "express";
import authRoute from "@/routes/AuthRoute";
import eventRoute from "@/routes/EventRoute";
import ticketRoute from "@/routes/TicketRoute";
import transactionRoute from "@/routes/TransactionRoute";
import conversationRoute from "@/routes/ConversationRoute";
import messageRoute from "@/routes/MessageRoute";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/ticket", ticketRoute);
router.use("/transaction", transactionRoute);
router.use("/conversation", conversationRoute);
router.use("/message", messageRoute);

export default router;
