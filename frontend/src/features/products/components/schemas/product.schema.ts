import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  description: z.string().optional(),

  categoryId: z.string().min(1, "Category is required"),

  basePrice: z.coerce.number().min(0),

  gst: z.coerce.number().min(0),

  discount: z.coerce.number().min(0),
});

export type ProductFormValues = z.infer<typeof productSchema>;