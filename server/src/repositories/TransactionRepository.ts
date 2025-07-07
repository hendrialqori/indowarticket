import { TransactionInsert, transactions } from "@/db/schemas/Transaction";
import { tickets } from "@/db/schemas/Ticket";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { users } from "@/db/schemas/User";
// import { events } from "@/db/schemas/Event";
// import { users } from "@/db/schemas/User";


export async function indexByTicketId(ticket_id: string) {
    const trxRow = {
        id: transactions.id,
        description: transactions.description,
        ticket: {
            id: tickets.id,
            code: tickets.code,
        },
        users: {
            id: users.id,
            email: users.email,
            display_name: users.display_name
        },
        status: transactions.status,
        purcase_time: transactions.purchase_time,
        created_at: transactions.created_at
    }

    const result = await db.select(trxRow).from(transactions)
        .innerJoin(tickets, eq(tickets.id, transactions.ticket_id))
        .innerJoin(users, eq(users.id, transactions.user_id))
        .where((eq(transactions.ticket_id, ticket_id)))

    return result
}

export async function create(payload: TransactionInsert) {
    await db.insert(transactions).values(payload)
}

export async function paid(id: string) {
    await db.update(transactions)
        .set({
            status: "PAID",
            purchase_time: sql`now()`,
            updated_at: sql`now()`
        })
        .where(eq(transactions.id, id))
}

export async function failed(id: string) {
    await db.update(transactions)
        .set({
            status: "FAILED",
            updated_at: sql`now()`
        })
        .where(eq(transactions.id, id))
}