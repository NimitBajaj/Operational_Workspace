import {z} from "zod";
import { Priority } from "@prisma/client";

export const ProjectBaseSchema = z.object({
    customerId: z
      .string()
      .cuid("Invalid customer ID."),

    title: z
       .string()
       .trim()
       .min(1,"Title is required")
       .max(200, "Title cannot exceed 200 character"),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),

    location: z
        .string()
        .trim()
        .max(255, "Location cannot exceed 255 characters.")
        .optional(),

    projectType: z
        .string()
        .trim()
        .max(100, "Project type cannot exceed 100 characters.")
        .optional(),

    priority: z.nativeEnum(Priority),

    estimatedValue: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount.")
        .optional(),

    expectedCompletionDate: z
        .string()
        .datetime()
        .optional(),

     actualCompletionDate: z
        .string()
        .datetime()
        .optional(),
    
}); 

export const createProjectSchema = ProjectBaseSchema;
export const updateProjectSchema = ProjectBaseSchema.partial();
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

