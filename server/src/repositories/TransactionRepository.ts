import { type TransactionInsert, transactions } from "@/db/schemas/Transaction";
import { db } from "@/db";
import { SQL, and, desc, eq, gte, sql } from "drizzle-orm";
import { users } from "@/db/schemas/User";
import { events } from "@/db/schemas/Event";
import { TransactionIndexQuery } from "@/types/Transaction";
import { tickets } from "@/db/schemas/Ticket";
import { ApiError } from "@/utils/errors/ApiError";
import { status } from "http-status";

export async function index(query: TransactionIndexQuery) {
    const rows = {
        id: transactions.id,
        description: transactions.description,
        status: transactions.status,
        purchase_time: transactions.purchase_time,
        invoice_url: transactions.invoice_url,
        user: {
            id: users.id,
            email: users.email,
            display_name: users.display_name,
        },
        event: {
            id: events.id,
            name: events.name,
            ticket_price: events.ticket_price,
            ticket_count: events.ticket_count,
            created_at: events.created_at,
        },
        created_at: transactions.created_at,
    };

    const whereClause = [] as SQL<unknown>[];
    for (const [key, value] of Object.entries(query)) {
        if (key) {
            whereClause.push(eq(transactions[key as keyof TransactionIndexQuery], value));
        }
    }
    const results = db
        .select(rows)
        .from(transactions)
        .orderBy(desc(transactions.created_at))
        .where(and(...whereClause))
        .innerJoin(users, eq(users.id, transactions.user_id))
        .innerJoin(events, eq(events.id, transactions.event_id));

    return results;
}

export async function create(payload: TransactionInsert) {
    await db.insert(transactions).values(payload);
}

export async function paid(transaction_id: string, event_id: string) {
    await db.transaction(async (tx) => {
        // update transaction
        await tx
            .update(transactions)
            .set({
                status: "PAID",
                purchase_time: sql`now()`,
                invoice_url: null,
                updated_at: sql`now()`,
            })
            .where(eq(transactions.id, transaction_id));

        // create new ticket
        await tx.insert(tickets).values({ transaction_id });

        // update event ticket available
        const [result] = await tx
            .update(events)
            .set({ ticket_available: sql`${events.ticket_available} - 1` })
            .where(and(eq(events.id, event_id), gte(events.ticket_available, 0)));

        if (!result.affectedRows) {
            throw new ApiError(status.CONFLICT, "no tickets available");
        }
    });
}

export async function failed(id: string) {
    await db
        .update(transactions)
        .set({
            status: "FAILED",
            purchase_time: null,
            updated_at: sql`now()`,
        })
        .where(eq(transactions.id, id));
}
