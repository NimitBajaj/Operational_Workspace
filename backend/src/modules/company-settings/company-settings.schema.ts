import { z } from "zod";

export const createCompanySettingsSchema = z.object({
    companyName: z.string().min(1),

    address: z.string().min(1),

    phone: z.string().optional(),

    email: z.string().email().optional(),

    website: z.string().optional(),

    gstNumber: z.string().optional(),

    panNumber: z.string().optional(),

    bankName: z.string().optional(),

    accountName: z.string().optional(),

    accountNumber: z.string().optional(),

    ifscCode: z.string().optional(),

    upiId: z.string().optional(),

    quotationValidityDays: z.number().int().positive().default(15),

    termsAndConditions: z.string().optional(),

    logoUrl: z.string().optional(),
});

export const updateCompanySettingsSchema =
    createCompanySettingsSchema.partial();

export type CreateCompanySettingsInput =
    z.infer<typeof createCompanySettingsSchema>;

export type UpdateCompanySettingsInput =
    z.infer<typeof updateCompanySettingsSchema>;