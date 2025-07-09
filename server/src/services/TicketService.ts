import * as ticketRepository from '@/repositories/TicketRepository'

export async function index() {
    const tickets = await ticketRepository.index()
    return tickets
}
