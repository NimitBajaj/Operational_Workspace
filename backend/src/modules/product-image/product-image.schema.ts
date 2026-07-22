import { z } from "zod";

export const ProductImageBaseSchema = z.object({
    productId: z.string().cuid(),

    storageKey: z.string().trim().min(1),

    imageUrl: z.string().url(),

    altText: z.string().trim().max(255).optional(),

    isPrimary: z.boolean().optional(),

    sortOrder: z.number().int().min(0).optional(),
});

export const CreateProductImageSchema =
    ProductImageBaseSchema;

export const UpdateProductImageSchema =
    ProductImageBaseSchema.partial();

export type CreateProductImageInput =
    z.infer<typeof CreateProductImageSchema>;

export type UpdateProductImageInput =
    z.infer<typeof UpdateProductImageSchema>;