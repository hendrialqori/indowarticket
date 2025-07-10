import { Router } from "express";
import * as conversationController from "@/controllers/ConversationController";
import { tokenMiddleware } from "@/middlewares/TokenMiddleware";
import { roleMiddleware } from "@/middlewares/RoleMiddleware";
import { ROLE } from "@/constants/enum";

const route = Router();

route.use(tokenMiddleware);
route.use(roleMiddleware(ROLE.ADMIN, ROLE.BUYER));

route.post("/create/buyer", conversationController.create);
route.delete("/remove", conversationController.remove);

export default route;
