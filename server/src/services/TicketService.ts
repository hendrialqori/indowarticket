import { TicketInsert, createTicketSchema } from '@/db/schemas/Ticket'
import * as ticketRepository from '@/repositories/TicketRepository'
import * as eventRepository from '@/repositories/EventRepository'
import { ValidationError } from '@/utils/errors/ValidationError'
import { ApiError } from '@/utils/errors/ApiError'
import { status } from 'http-status'

export async function index() {
    const tickets = await ticketRepository.index()
    return tickets
}

export async function buy(payload: Pick<TicketInsert, 'user_id' | 'event_id'>) {
    const result = createTicketSchema.safeParse(payload)

    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse buy tickey");
    }

    // check available event ticket
    const event = await eventRepository.show(String(result.data.event_id))
    if (event.ticket_available <= 0) {
        throw new ApiError(status.CONFLICT, "ticket sold out")
    }

    await ticketRepository.create(result.data)
}