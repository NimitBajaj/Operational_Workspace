import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Customer name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().min(10, "Phone number is required"),

  type: z.enum([
    "ARCHITECT",
    "BUILDER",
    "CONTRACTOR",
  ]),

  gstNumber: z.string().optional(),

  address: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  pincode: z.string().optional(),

  notes: z.string().optional(),
});

export type CustomerFormValues = z.output<typeof customerSchema>;
export type CustomerFormInput = z.input<typeof customerSchema>;