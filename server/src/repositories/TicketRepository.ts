import { db } from "@/db";
import { tickets } from "@/db/schemas/Ticket";
import { eq } from "drizzle-orm";
import { transactions } from "@/db/schemas/Transaction";
import { events } from "@/db/schemas/Event";
import { users } from "@/db/schemas/User";

export async function index() {
    const rows = {
        id: tickets.id,
        status: tickets.status,
        user: {
            id: users.id,
            email: users.email,
            display_name: users.display_name
        },
        event: {
            name: events.name,
            description: events.description,
            start_time: events.start_time,
            status: events.status,
            ticket_price: events.ticket_price
        },
        transaction: {
            purchase_time: transactions.purchase_time,
            status: transactions.status
        },
        created_at: tickets.created_at,
        updated_at: tickets.updated_at
    }

    const results =
        await db.select(rows).from(tickets)
            .innerJoin(transactions, eq(transactions.id, tickets.transaction_id))
            .innerJoin(users, eq(users.id, transactions.user_id))
            .innerJoin(events, eq(events.id, transactions.event_id))
            .where(eq(transactions.id, tickets.transaction_id))

    return results
}

