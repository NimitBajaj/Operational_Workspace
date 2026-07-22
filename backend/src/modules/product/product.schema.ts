import {z} from "zod";

export const ProductBaseSchema = z.object({
    name: z
     .string()
     .trim()
     .min(3, "Product name must be atleast 3 characters")
     .max(100, "Product name cannot exceed 100 characters"),

    shortDescription: z.string().max(250).optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters.")
      .optional(),

    categoryId: z
      .string()
      .cuid("Invalaid Category Id"),

    warranty: z
      .string()
      .trim()
      .max(50)
      .optional(),

    featured: z.boolean().optional(), 

    active: z.boolean().optional().default(true),

});

export const CreateProductSchema = ProductBaseSchema;

export const UpdateProductSchema = ProductBaseSchema.partial();

export const SearchProductSchema = z.object({
    query: z.string().trim().optional(),

    categoryId: z.string().cuid().trim().optional(),

    active: z.coerce.boolean().optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
});

export const ProductIdSchema = z.object({
    id: z.string().cuid(),
});


export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

export type SearchProductInput = z.infer<typeof SearchProductSchema>;


