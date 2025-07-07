import { Router } from "express";
import { tokenMiddleware } from "@/middlewares/TokenMiddleware";
import * as ticketController from '@/controllers/TicketController'
import { roleMiddleware } from "@/middlewares/RoleMiddleware";
import { ROLE } from "@/constants/enum";

export const route = Router()

route.use(tokenMiddleware)

route.get('/index', ticketController.index)
route.post('/buy', roleMiddleware(ROLE.BUYER), ticketController.buy)

export default route