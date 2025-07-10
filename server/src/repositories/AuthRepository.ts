import { ROLE } from "@/constants/enum";
import { db } from "@/db";
import { conversations } from "@/db/schemas/Conversation";
import { events } from "@/db/schemas/Event";
import { messages } from "@/db/schemas/Messages";
import { tickets } from "@/db/schemas/Ticket";
import { transactions } from "@/db/schemas/Transaction";
import { users, type UserInsert } from "@/db/schemas/User";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

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

export async function conversation(id: string, role: keyof typeof ROLE) {
    const buyer = alias(users, "buyer");
    const admin = alias(users, "admin");

    const rows = {
        id: conversations.id,
        buyer: {
            id: buyer.id,
            email: buyer.email,
            display_name: buyer.display_name,
        },
        admin: {
            id: admin.id,
            email: admin.email,
            display_name: admin.display_name,
        },
        event: {
            id: events.id,
            name: events.name,
            description: events.description,
            start_time: events.start_time,
            ticket_price: events.ticket_price,
            status: events.status,
            created_at: events.created_at,
        },
        created_at: conversations.created_at,
    };

    const result = await db
        .select(rows)
        .from(conversations)
        .innerJoin(buyer, eq(buyer.id, conversations.buyer_id))
        .innerJoin(admin, eq(admin.id, conversations.admin_id))
        .innerJoin(events, eq(events.id, conversations.event_id))
        .where(eq(role === "ADMIN" ? conversations.admin_id : conversations.buyer_id, id));

    return result;
}

export async function message(user_id: string, conversation_id: string) {
    const sender = alias(users, "sender");

    const rows = {
        id: messages.id,
        message: messages.message,
        sender: {
            id: sender.id,
            display_name: sender.display_name,
            email: sender.email,
        },
        conversation_id: messages.conversation_id,
        created_at: messages.created_at,
        updated_at: messages.updated_at,
    };

    const result = await db
        .select(rows)
        .from(messages)
        .innerJoin(sender, eq(sender.id, messages.sender_id))
        .where(and(eq(messages.sender_id, user_id), eq(messages.conversation_id, conversation_id)));

    return result;
}
