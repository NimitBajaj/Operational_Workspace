import { z } from "zod";
import {
    Priority,
    TaskStatus,
    TaskType,
} from "@prisma/client";

export const createTaskSchema = z.object({
    projectId: z
        .string()
        .cuid("Invalid project ID."),

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

    type: z.nativeEnum(TaskType),

    priority: z.nativeEnum(Priority),

    dueDate: z
        .string()
        .datetime()
        .optional(),
});

export const updateTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1)
        .max(255)
        .optional(),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    type: z
        .nativeEnum(TaskType)
        .optional(),

    priority: z
        .nativeEnum(Priority)
        .optional(),

    dueDate: z
        .string()
        .datetime()
        .optional(),
});

export type CreateTaskInput =
    z.infer<typeof createTaskSchema>;

export type UpdateTaskInput =
    z.infer<typeof updateTaskSchema>;

    
