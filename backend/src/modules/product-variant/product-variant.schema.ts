import { create } from "node:domain";
import {z} from "zod";

export const ProductVariantBaseSchema = z.object({
    productId: z
        .string()
        .cuid("Invalid product ID."),

    sku: z
        .string()
        .trim()
        .max(100)
        .optional(),

    wattage: z.string().trim().max(50).optional(),

    colorTemperature: z.string().trim().max(50).optional(),

    finish: z.string().trim().max(100).optional(),

    beamAngle: z.string().trim().max(50).optional(),

    cutout: z.string().trim().max(50).optional(),

    dimensions: z.string().trim().max(100).optional(),

    voltage: z.string().trim().max(50).optional(),

    ipRating: z.string().trim().max(20).optional(),

    cri: z.string().trim().max(20).optional(),

    supplierCode: z.string().trim().max(100).optional(),

    costPrice: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid cost price.")
        .optional(),

    sellingPrice: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid selling price."),

    mrp: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid MRP.")
        .optional(),

    gstPercent: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid GST percentage."),

    stockQuantity: z
        .number()
        .int()
        .min(0)
        .default(0),

    active: z
        .boolean()
        .optional(),
});

export const createProductVariantSchema = ProductVariantBaseSchema;
export const updateProductVariantSchema = createProductVariantSchema.partial();
export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>;
export type UpdateProductVariantInput = z.infer<typeof updateProductVariantSchema>;