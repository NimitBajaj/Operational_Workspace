import { z } from "zod";
import {
    ActivityType,
    EntityType,
} from "@prisma/client";

export const createActivitySchema = z.object({
    projectId: z
        .string()
        .cuid("Invalid project ID."),

    type: z.nativeEnum(ActivityType),

    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(255),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    entityType: z
        .nativeEnum(EntityType)
        .optional(),

    entityId: z
        .string()
        .cuid("Invalid entity ID.")
        .optional(),

    performedBy: z
        .string()
        .trim()
        .max(255)
        .optional(),
})

.superRefine((data, ctx) => {

    const hasEntityType = !!data.entityType;
    const hasEntityId = !!data.entityId;

    if (hasEntityType !== hasEntityId) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                "entityType and entityId must either both be provided or both be omitted.",
        });
    }
});

export type CreateActivityInput =
    z.infer<typeof createActivitySchema>;

