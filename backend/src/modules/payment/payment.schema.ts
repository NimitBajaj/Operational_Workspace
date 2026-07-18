import {z} from "zod";
import { PaymentMethod, PaymentStatus, PaymentType}from "@prisma/client";

export const createPaymentSchema = z.object({
    projectId: z
        .string()
        .cuid("Invalid project ID."),

    quotationId: z
        .string()
        .cuid("Invalid quotation ID.")
        .optional(),

    type: z.nativeEnum(PaymentType),

    amount: z
        .number()
        .positive("Amount must be greater than 0."),

    dueDate: z
        .string()
        .datetime()
        .optional(),

    remarks: z
        .string()
        .trim()
        .max(1000)
        .optional(),
});

export const updatePaymentSchema = z.object({
    dueDate: z
        .string()
        .datetime()
        .optional(),

    remarks: z
        .string()
        .trim()
        .max(1000)
        .optional(),
});

export const markPaymentPaidSchema = z.object({
    paymentMethod: z.nativeEnum(PaymentMethod),

    referenceNumber: z
        .string()
        .trim()
        .max(100)
        .optional(),
});

export const followUpSchema = z.object({
    followUpDate: z
        .string()
        .datetime(),
});

export type CreatePaymentInput =
    z.infer<typeof createPaymentSchema>;

export type UpdatePaymentInput =
    z.infer<typeof updatePaymentSchema>;

export type MarkPaymentPaidInput =
    z.infer<typeof markPaymentPaidSchema>;

export type FollowUpInput =
    z.infer<typeof followUpSchema>;