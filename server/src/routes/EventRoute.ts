import { Router } from "express";
import * as eventController from "@/controllers/EventController";
import { tokenMiddleware } from "@/middlewares/TokenMiddleware";
import { roleMiddleware } from "@/middlewares/RoleMiddleware";
import { ROLE } from "@/constants/enum";

const route = Router();

route.use(tokenMiddleware);

route.get("/index", eventController.index);

// Applied RBAC here!
route.use(roleMiddleware(ROLE.ADMIN))
route.post("/create", eventController.create);
route.put("/update/:id", eventController.update);
route.delete("/remove/:id", eventController.remove);

export default route;
