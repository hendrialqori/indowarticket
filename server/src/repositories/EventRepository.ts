import { eq } from "drizzle-orm";
import { db } from "@/db";
import { type EventInsert, events as eventsTable } from "@/db/schemas/Event";

export async function index() {
    const events = await db.select().from(eventsTable);
    return events;
}

export async function show(id: string) {
    const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
    return event;
}

export async function create(payload: EventInsert) {
    await db.insert(eventsTable).values(payload);
}

export async function update(id: string, payload: EventInsert) {
    await db.update(eventsTable).set(payload).where(eq(eventsTable.id, id));
}

export async function remove(id: string) {
    await db.delete(eventsTable).where(eq(eventsTable.id, id));
}
