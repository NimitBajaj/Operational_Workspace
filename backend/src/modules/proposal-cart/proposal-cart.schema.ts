import { z } from "zod";

export const ProposalCartItemSchema = z.object({
    productId: z.string().cuid(),
    variantId: z.string().cuid(),
    quantity: z.number().int().min(1).max(100),
});

export const CreateProposalCartSchema = z.object({
    items: z.array(ProposalCartItemSchema).min(1),
});

export type CreateProposalCartInput =
    z.infer<typeof CreateProposalCartSchema>;