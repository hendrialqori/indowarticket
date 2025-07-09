import { xenditClient } from '@/config/xendit'
import { type EventSelect } from '@/db/schemas/Event'
import { type UserSelect } from '@/db/schemas/User'
import { type CreateInvoiceRequest } from 'xendit-node/invoice/models'

const invoiceClient = xenditClient.Invoice

export async function create(payload: { user: UserSelect, event: EventSelect }) {
    const invoiceData: CreateInvoiceRequest = {
        externalId: `trx-${Date.now()}-${payload.user.email}`,
        currency: "IDR",
        amount: payload.event.ticket_price,
        customer: {
            email: payload.user.email,
            givenNames: payload.user.display_name,
        },
        description: `Ticket purchase invoice of ${payload.event.name}`,
        items: [
            {
                referenceId: String(payload.event.id),
                name: payload.event.name,
                price: payload.event.ticket_price,
                quantity: 1,
                category: "Ticket",
            }
        ],
        customerNotificationPreference: {
            invoiceCreated: ["whatsapp", "email"],
            invoicePaid: ["whatsapp", "email"],
            invoiceReminder: ["whatsapp", "email"]
        },
        // successRedirectUrl: SUCCESS_PAYMENT_URL,
        // failureRedirectUrl: FAILED_PAYMENT_URL
    }

    const result = await invoiceClient.createInvoice({ data: invoiceData })
    return result
}

export function webhook() { }