import { TicketInsert } from '@/db/schemas/Ticket'
import { UserSelect } from '@/db/schemas/User'
import * as ticketService from '@/services/TicketService'
import { mockApiSuccess } from '@/utils/mockResponse'
import { Request, Response } from 'express'
import status from 'http-status'

export async function index(req: Request, res: Response) {
    const tickets = await ticketService.index()

    mockApiSuccess(res, {
        statusCode: status.OK,
        message: 'ok',
        data: tickets
    })
}

export async function buy(req: Request, res: Response) {
    const { id: user_id } = req.user as UserSelect
    const { event_id } = req.body as TicketInsert

    await ticketService.buy({ user_id, event_id })

    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "bought",
        data: { user_id, event_id }
    })

}