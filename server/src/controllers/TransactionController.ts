import * as transactionService from '@/services/TransactionService'
import { mockApiSuccess } from '@/utils/mockResponse';
import { Request, Response } from 'express';
import status from 'http-status';

export async function indexByTicketId(req: Request, res: Response) {
    const ticketId = req.params.id
    const tickets = await transactionService.indexByTicketId(ticketId)

    mockApiSuccess(res, {
        statusCode: status.OK,
        message: 'ok',
        data: tickets
    })
}

export async function create(req: Request, res: Response) {
    const requestBody = req.body
    await transactionService.create(requestBody)
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: 'created',
        data: requestBody
    })
}

export async function paid(req: Request, res: Response) {
    const id = req.params.id
    await transactionService.paid(id)
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: 'transaction paid',
        data: {}
    })
}

export async function failed(req: Request, res: Response) {
    const id = req.params.id
    await transactionService.failed(id)
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: 'transaction failed',
        data: {}
    })
}