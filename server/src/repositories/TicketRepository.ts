import { db } from "@/db";
import { TicketInsert, tickets as ticketsTable } from "@/db/schemas/Ticket";
import { users as usersTable } from "@/db/schemas/User";
import { events as eventsTable } from "@/db/schemas/Event";
import { eq, sql } from "drizzle-orm";

export async function index() {
    const mappedRow = {
        id: ticketsTable.id,
        code: ticketsTable.code,
        user: {
            id: usersTable.id,
            email: usersTable.email,
            display_name: usersTable.display_name,
            provider_id: usersTable.provider_id
        },
        event: {
            id: eventsTable.id,
            name: eventsTable.name,
            start_time: eventsTable.start_time
        },
        purchase_time: ticketsTable.purchase_time,
        created_at: ticketsTable.created_at
    }

    const tickets =
        await db.select(mappedRow).from(ticketsTable)
            .innerJoin(usersTable, eq(usersTable.id, ticketsTable.user_id))
            .innerJoin(eventsTable, eq(eventsTable.id, ticketsTable.event_id))

    return tickets
}

export async function show(id: string) {
    const [ticket] = await db.select().from(ticketsTable).where(eq(ticketsTable.id, id))
    return ticket
}

export async function create(payload: TicketInsert) {
    await db.transaction(async (tx) => {
        try {
            await db.insert(ticketsTable).values(payload)
            await db.update(eventsTable)
                .set({ ticket_available: sql`${eventsTable.ticket_available} - 1` })
                .where(eq(eventsTable.id, String(payload.event_id)))
        } catch (error) {
            tx.rollback()
        }
    })
}

export async function update(id: string, payload: TicketInsert) {
    await db.update(ticketsTable).set(payload).where(eq(ticketsTable.id, id))
}

export async function remove(id: string) {
    await db.delete(ticketsTable).where(eq(ticketsTable.id, id))
}