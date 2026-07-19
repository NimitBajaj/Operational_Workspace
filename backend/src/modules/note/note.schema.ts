import { z } from "zod";
import { NoteType } from "@prisma/client";

export const createNoteSchema = z.object({
    projectId: z
        .string()
        .cuid("Invalid project ID."),

    title: z
        .string()
        .trim()
        .max(255)
        .optional(),

    content: z
        .string()
        .trim()
        .min(1, "Content is required.")
        .max(5000),

    type: z.nativeEnum(NoteType),

    tags: z
        .array(z.string().trim())
        .default([]),

    isPinned: z
        .boolean()
        .optional(),
});

export const updateNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .max(255)
        .optional(),

    content: z
        .string()
        .trim()
        .min(1)
        .max(5000)
        .optional(),

    type: z
        .nativeEnum(NoteType)
        .optional(),

    tags: z
        .array(z.string().trim())
        .optional(),

    isPinned: z
        .boolean()
        .optional(),
});

export type CreateNoteInput =
    z.infer<typeof createNoteSchema>;

export type UpdateNoteInput =
    z.infer<typeof updateNoteSchema>;