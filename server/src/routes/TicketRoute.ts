import { Router } from "express";
import { tokenMiddleware } from "@/middlewares/TokenMiddleware";
import * as ticketController from "@/controllers/TicketController";

export const route = Router();

route.use(tokenMiddleware);

route.get("/index", ticketController.index);

export default route;
