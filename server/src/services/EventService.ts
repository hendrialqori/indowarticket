import { type EventInsert, createEventSchema, updateEventSchema } from "@/db/schemas/Event";
import * as eventRepository from "@/repositories/EventRepository";
import { ApiError } from "@/utils/errors/ApiError";
import { ValidationError } from "@/utils/errors/ValidationError";
import status from "http-status";
import { z } from "zod/v4";

export async function index() {
    const events = await eventRepository.index();
    return events;
}

export async function create(payload: EventInsert) {
    const result = createEventSchema.safeParse(payload);

    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse create event payload");
    }

    await eventRepository.create(result.data);
}

export async function update(id: string, payload: EventInsert) {
    const result = updateEventSchema.safeParse(payload);

    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse create event payload");
    }

    await eventRepository.update(id, result.data as EventInsert);
}

export async function remove(id: string) {
    const idSchema = z.string().min(8).max(8);

    const result = idSchema.safeParse(id);

    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse params id");
    }

    const event = await eventRepository.show(result.data);
    if (!event) {
        throw new ApiError(status.NOT_FOUND, "event not found");
    }

    await eventRepository.remove(result.data);
}
