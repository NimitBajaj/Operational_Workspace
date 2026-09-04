import { z } from "zod";

import {
  PROJECT_STATUS,
  PRIORITIES,
} from "@shared/enums/project";

export const projectSchema = z.object({
  title: z.string().min(2, "Project title is required"),

  description: z.string().optional(),

  customerId: z.string().min(1, "Customer is required"),

  location: z.string().optional(),

  projectType: z.string().optional(),

  status: z.enum(PROJECT_STATUS),

  priority: z.enum(PRIORITIES),

  estimatedValue: z.coerce.number().optional(),

  expectedCompletionDate: z.string().optional(),
});

export type ProjectFormInput =
  z.input<typeof projectSchema>;

export type ProjectFormValues =
  z.output<typeof projectSchema>;