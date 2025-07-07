import { type TransactionInsert, createTransactionSchema } from '@/db/schemas/Transaction';
import * as transactionRepository from '@/repositories/TransactionRepository'
import { ValidationError } from '@/utils/errors/ValidationError';
import { validateId } from '@/utils/validate';

export async function indexByTicketId(ticket_id: string) {
    const validTicketId = validateId(ticket_id)
    const result = await transactionRepository.indexByTicketId(validTicketId)
    return result
}

export async function create(payload: TransactionInsert) {
    const result = createTransactionSchema.safeParse(payload)
    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse create transaction");
    }
    await transactionRepository.create(result.data)
}

export async function paid(id: string) {
    const validId = validateId(id)
    await transactionRepository.paid(validId)
}

export async function failed(id: string) {
    const validId = validateId(id)
    await transactionRepository.failed(validId)
}