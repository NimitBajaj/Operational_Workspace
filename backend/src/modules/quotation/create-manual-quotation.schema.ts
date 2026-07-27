import { z } from "zod";

export const createManualQuotationSchema = z.object({
    projectId: z.string().cuid().optional(),

    remarks: z.string().optional(),

    items: z.array(
        z.object({
            productVariantId: z.string().cuid(),
            quantity: z.number().int().positive(),
        })
    ).min(1),
});

export type CreateManualQuotationInput =
    z.infer<typeof createManualQuotationSchema>;