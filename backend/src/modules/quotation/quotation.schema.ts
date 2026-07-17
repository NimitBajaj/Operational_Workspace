import {z} from "zod";

export const createQuotationItemSchema = z.object({
    productVariantId: z
        .string()
        .cuid("Invalid product variant ID."),

    quantity: z
        .number()
        .int()
        .positive(),

    discount: z
        .number()
        .nonnegative()
        .optional(),

    remarks: z
        .string()
        .trim()
        .max(500)
        .optional(),
});

export const createQuotationSchema = z.object({
    projectId: z
        .string()
        .cuid("Invalid project ID."),

    discount: z
        .number()
        .nonnegative()
        .optional(),

    validUntil: z
        .string()
        .datetime()
        .optional(),

    remarks: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    items: z
        .array(createQuotationItemSchema)
        .min(1, "Quotation must contain at least one item."),
});

export const updateQuotationSchema = createQuotationItemSchema.partial();

export type CreateQuotationInput =
    z.infer<typeof createQuotationSchema>;

export type UpdateQuotationInput =
    z.infer<typeof updateQuotationSchema>;