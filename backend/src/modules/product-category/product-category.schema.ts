import { z } from "zod";

export const CreateProductCategorySchema = z.object({
    name: z.string().min(1).max(100),

    slug: z.string()
        .min(1)
        .max(100)
        .regex(/^[a-z0-9-]+$/),

    description: z.string().optional(),

    imageUrl: z.string().url().optional(),

    featured: z.boolean().optional(),

    active: z.boolean().optional(),

    sortOrder: z.number().int().optional()
});

export const UpdateProductCategorySchema =
    CreateProductCategorySchema.partial();

export type CreateProductCategoryInput =
    z.infer<typeof CreateProductCategorySchema>;

export type UpdateProductCategoryInput =
    z.infer<typeof  UpdateProductCategorySchema>;