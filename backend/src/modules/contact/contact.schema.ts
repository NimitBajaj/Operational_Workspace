import {z} from "zod";
import { ContactRole } from "@prisma/client";

export const ContactBaseSchema = z.object({
    customerId: z
        .string()
        .cuid("Invalid customer ID."),

    name: z
        .string()
        .trim()
        .min(1, "Name is required.")
        .max(100),

    role: z.nativeEnum(ContactRole),

    phone: z
        .string()
        .trim()
        .min(10)
        .max(20),

    email: z
        .string()
        .email()
        .optional(),

    company: z
        .string()
        .trim()
        .max(100)
        .optional(),

    designation: z
        .string()
        .trim()
        .max(100)
        .optional(),

    address: z
        .string()
        .trim()
        .max(255)
        .optional(),

    city: z
        .string()
        .trim()
        .max(100)
        .optional(),

    state: z
        .string()
        .trim()
        .max(100)
        .optional(),

    notes: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    isPrimary: z
        .boolean()
        .optional(),
});

export const createContactSchema = ContactBaseSchema;
export const updateContactSchema = ContactBaseSchema.partial();

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
