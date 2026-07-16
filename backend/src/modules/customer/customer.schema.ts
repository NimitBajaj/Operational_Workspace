import {z} from 'zod';
import { CustomerType } from '@prisma/client';

export const CustomerSchema = z.object({
    name: z.string().trim().min(2).max(100),

    type: z.nativeEnum(CustomerType),

    email: z.string().email().optional(),

    phone: z.string().min(10).max(15),

    gstNumber: z.string().optional(),

    address: z.string().optional(),

    city: z.string().optional(),

    state: z.string().optional(),

    pincode: z.string().optional(),

    notes: z.string().optional(),
});

export const updateCustomerSchema = CustomerSchema.partial();
export const createCustomerSchema = CustomerSchema

export type CreateCustomerInput = z.infer<typeof CustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;




