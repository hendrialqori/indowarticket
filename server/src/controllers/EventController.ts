import { Request, Response } from "express";
import { status } from "http-status";
import * as eventService from "@/services/EventService";
import { mockApiSuccess } from "@/utils/mockResponse";

export async function index(req: Request, res: Response) {
    const events = await eventService.index();
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: events,
    });
}

export async function create(req: Request, res: Response) {
    const requestBody = req.body;
    await eventService.create(requestBody);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "created",
        data: requestBody,
    });
}

export async function update(req: Request, res: Response) {
    const id = req.params.id;
    const requestBody = req.body;

    await eventService.update(id, requestBody);
    mockApiSuccess(res, {
        statusCode: status.CREATED,
        message: "updated",
        data: requestBody,
    });
}

export async function remove(req: Request, res: Response) {
    const id = req.params.id;

    await eventService.remove(id);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "deleted",
        data: [],
    });
}
