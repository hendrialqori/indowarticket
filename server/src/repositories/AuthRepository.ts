import { db } from "@/db";
import { events } from "@/db/schemas/Event";
import { tickets } from "@/db/schemas/Ticket";
import { transactions } from "@/db/schemas/Transaction";
import { users, type UserInsert } from "@/db/schemas/User";
import { and, eq } from "drizzle-orm";

export async function show(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
}

export async function showByProviderId(provider_id: string) {
    const [user] = await db.select().from(users).where(eq(users.provider_id, provider_id));
    return user;
}

export async function create(params: UserInsert) {
    await db.insert(users).values(params);
}

export async function transaction(id: string) {
    const rows = {
        id: transactions.id,
        description: transactions.description,
        event: {
            id: events.id,
            name: events.name,
            start_time: events.start_time,
            ticket_price: events.ticket_price,
            status: events.status,
            created_at: events.created_at,
        },
        purchase_time: transactions.purchase_time,
        created_at: transactions.created_at,
        updated_at: transactions.updated_at,
    };

    const result = await db
        .select(rows)
        .from(transactions)
        .where(eq(transactions.user_id, id))
        .innerJoin(events, eq(events.id, transactions.event_id));

    return result;
}

export async function ticket(id: string) {
    const rows = {
        id: tickets.id,
        status: tickets.status,
        event: {
            name: events.name,
            description: events.description,
            start_time: events.start_time,
            status: events.status,
            ticket_price: events.ticket_price,
        },
        transaction: {
            purchase_time: transactions.purchase_time,
            status: transactions.status,
        },
        created_at: tickets.created_at,
        updated_at: tickets.updated_at,
    };

    const result = await db
        .select(rows)
        .from(tickets)
        .innerJoin(transactions, eq(transactions.id, tickets.transaction_id))
        .innerJoin(events, eq(events.id, transactions.event_id))
        .where(and(eq(transactions.user_id, id), eq(transactions.status, "PAID")));

    return result;
}
