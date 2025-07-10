import { tokenMiddleware } from "@/middlewares/TokenMiddleware";
import { Router } from "express";
import * as messageController from "@/controllers/MessageController";

const route = Router();

route.use(tokenMiddleware);
route.post("/send", messageController.send);

export default route;
