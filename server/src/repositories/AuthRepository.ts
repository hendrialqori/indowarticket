import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { ROLE } from "@/constants/enum";
import { db } from "@/db";
import { conversations } from "@/db/schemas/Conversation";
import { events } from "@/db/schemas/Event";
import { messages } from "@/db/schemas/Messages";
import { tickets } from "@/db/schemas/Ticket";
import { transactions } from "@/db/schemas/Transaction";
import { users, type UserInsert } from "@/db/schemas/User";

export class AuthRepository {
    show = async (id: string) => {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user ?? null;
    };

    showByProviderId = async (provider_id: string) => {
        const [user] = await db.select().from(users).where(eq(users.provider_id, provider_id));
        return user ?? null;
    };

    create = async (params: UserInsert) => {
        await db.insert(users).values(params);
    };

    transaction = async (userId: string) => {
        return db
            .select({
                id: transactions.id,
                description: transactions.description,
                purchase_time: transactions.purchase_time,
                created_at: transactions.created_at,
                updated_at: transactions.updated_at,
                event: {
                    id: events.id,
                    name: events.name,
                    start_time: events.start_time,
                    ticket_price: events.ticket_price,
                    status: events.status,
                    created_at: events.created_at,
                },
            })
            .from(transactions)
            .where(eq(transactions.user_id, userId))
            .innerJoin(events, eq(events.id, transactions.event_id));
    };

    ticket = async (userId: string) => {
        return db
            .select({
                id: tickets.id,
                status: tickets.status,
                created_at: tickets.created_at,
                updated_at: tickets.updated_at,
                event: {
                    name: events.name,
                    description: events.description,
                    start_time: events.start_time,
                    ticket_price: events.ticket_price,
                    status: events.status,
                },
                transaction: {
                    purchase_time: transactions.purchase_time,
                    status: transactions.status,
                },
            })
            .from(tickets)
            .innerJoin(transactions, eq(transactions.id, tickets.transaction_id))
            .innerJoin(events, eq(events.id, transactions.event_id))
            .where(
                and(
                    eq(transactions.user_id, userId),
                    eq(transactions.status, "PAID")
                )
            );
    };

    conversation = async (userId: string, role: keyof typeof ROLE) => {
        const buyer = alias(users, "buyer");
        const admin = alias(users, "admin");

        const condition =
            role === "ADMIN"
                ? eq(conversations.admin_id, userId)
                : eq(conversations.buyer_id, userId);

        return db
            .select({
                id: conversations.id,
                created_at: conversations.created_at,
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
            })
            .from(conversations)
            .innerJoin(buyer, eq(buyer.id, conversations.buyer_id))
            .innerJoin(admin, eq(admin.id, conversations.admin_id))
            .innerJoin(events, eq(events.id, conversations.event_id))
            .where(condition);
    };

    message = async (senderId: string, conversationId: string) => {
        const sender = alias(users, "sender");

        return db
            .select({
                id: messages.id,
                message: messages.message,
                conversation_id: messages.conversation_id,
                created_at: messages.created_at,
                updated_at: messages.updated_at,
                sender: {
                    id: sender.id,
                    email: sender.email,
                    display_name: sender.display_name,
                },
            })
            .from(messages)
            .innerJoin(sender, eq(sender.id, messages.sender_id))
            .where(
                and(
                    eq(messages.sender_id, senderId),
                    eq(messages.conversation_id, conversationId)
                )
            );
    };
}
