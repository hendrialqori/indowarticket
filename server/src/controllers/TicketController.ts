import * as ticketService from "@/services/TicketService";
import { mockApiSuccess } from "@/utils/mockResponse";
import { Request, Response } from "express";
import status from "http-status";

export async function index(req: Request, res: Response) {
    const tickets = await ticketService.index();

    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: tickets,
    });
}
