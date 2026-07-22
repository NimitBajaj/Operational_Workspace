import { z } from "zod";
import { validate } from "../../middleware/validation.middleware";

export const ProductImageBaseSchema = z.object({
    altText: z
        .string()
        .trim()
        .max(255)
        .optional()
        .or(z.literal(""))
        .transform(value => value || undefined),

    isPrimary: z
        .coerce
        .boolean()
        .optional(),

    sortOrder: z
        .coerce
        .number()
        .int()
        .min(0)
        .optional(),
});

export const CreateProductImageSchema =
    ProductImageBaseSchema;

export const UpdateProductImageSchema =
    ProductImageBaseSchema.partial();

export type CreateProductImageInput =
    z.infer<typeof CreateProductImageSchema>;

export type UpdateProductImageInput =
    z.infer<typeof UpdateProductImageSchema>;