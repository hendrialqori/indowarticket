import { ROLE } from '@/constants/enum'
import * as transactionController from '@/controllers/TransactionController'
import { roleMiddleware } from '@/middlewares/RoleMiddleware'
import { tokenMiddleware } from '@/middlewares/TokenMiddleware'
import { Router } from 'express'

const route = Router()

route.use(tokenMiddleware)

route.get('/index-ticket/:id', roleMiddleware(ROLE.ADMIN), transactionController.indexByTicketId)
route.post("/create", transactionController.create)
// route.put("/paid", transactionController.paid)
// route.put("/failed", transactionController.failed)

export default route