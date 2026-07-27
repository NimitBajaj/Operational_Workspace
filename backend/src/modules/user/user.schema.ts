import { z } from "zod";

export const UserBaseSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters.")
        .max(50),

    lastName: z
        .string()
        .trim()
        .max(50)
        .optional(),

    email: z
        .string()
        .trim()
        .email("Invalid email address."),

    phone: z
        .string()
        .trim()
        .max(20)
        .optional(),

    role: z.enum([
        "ADMIN",
        "SALES",
        "PROJECT_MANAGER",
        "STAFF",
        "CUSTOMER",
    ]).optional(),

    active: z.boolean().optional(),
});

export const CreateUserSchema = UserBaseSchema.extend({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
});

export const UpdateUserSchema = UserBaseSchema.partial();

export const UserIdSchema = z.object({
    id: z.string().cuid(),
});

export const LoginSchema = z.object({
    email: z
        .string()
        .trim()
        .email(),

    password: z
        .string()
        .min(1, "Password is required."),
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string(),

    newPassword: z
        .string()
        .min(8),
});

export type CreateUserInput =
    z.infer<typeof CreateUserSchema>;

export type UpdateUserInput =
    z.infer<typeof UpdateUserSchema>;

export type LoginInput =
    z.infer<typeof LoginSchema>;

export type ChangePasswordInput =
    z.infer<typeof ChangePasswordSchema>;