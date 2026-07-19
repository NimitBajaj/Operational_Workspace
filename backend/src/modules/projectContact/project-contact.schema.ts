import { z } from "zod";

export const createProjectContactSchema = z.object({
    projectId: z
        .string()
        .cuid("Invalid project id."),

    contactId: z
        .string()
        .cuid("Invalid contact id."),
});

export type CreateProjectContactInput =
    z.infer<typeof createProjectContactSchema>;