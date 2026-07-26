import { z } from "zod";

export const ProposalRequestItemSchema = z.object({
    productVariantId: z.string().cuid(),

    quantity: z.number().int().min(1),
});

export const CreateProposalRequestSchema = z.object({
    customerName: z.string().trim().min(2).max(100),

    customerEmail: z.string().email(),

    customerPhone: z.string().trim().max(20).optional(),

    companyName: z.string().trim().max(100).optional(),

    notes: z.string().trim().max(1000).optional(),

    items: z
        .array(ProposalRequestItemSchema)
        .min(1),
});

export const UpdateProposalRequestSchema =
    CreateProposalRequestSchema.partial();

export type CreateProposalRequestInput =
    z.infer<typeof CreateProposalRequestSchema>;

export type UpdateProposalRequestInput =
    z.infer<typeof UpdateProposalRequestSchema>;