import { type TransactionInsert, createTransactionSchema } from '@/db/schemas/Transaction';
import * as transactionRepository from '@/repositories/TransactionRepository'
import * as userRepository from '@/repositories/AuthRepository'
import * as eventRepository from '@/repositories/EventRepository'
import * as xenditService from '@/services/XenditService'
import { TransactionIndexQuery } from '@/types/Transaction';
import { ValidationError } from '@/utils/errors/ValidationError';

export async function index(query: TransactionIndexQuery) {
    const result = await transactionRepository.index(query)
    return result
}

export async function create(payload: TransactionInsert) {
    const user = await userRepository.show(String(payload.user_id))
    const event = await eventRepository.show(String(payload.event_id))

    // create invoice 
    // const invoice = await xenditService.create({ user, event })

    // payload.invoice_url = invoice.invoiceUrl
    const result = createTransactionSchema.safeParse(payload)
    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse create transaction");
    }
    await transactionRepository.create(result.data)
}
