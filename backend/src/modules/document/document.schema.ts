import { z } from "zod";
import { DocumentType } from "@prisma/client";

export const createDocumentSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Document name is required.")
            .max(255),

        fileName: z
            .string()
            .trim()
            .min(1, "File name is required.")
            .max(255),

        fileUrl: z
            .string()
            .url("Invalid file URL."),

        fileSize: z
            .number()
            .int()
            .positive()
            .optional(),

        mimeType: z
            .string()
            .trim()
            .optional(),

        type: z.nativeEnum(DocumentType),

        description: z
            .string()
            .trim()
            .max(1000)
            .optional(),

        productId: z
            .string()
            .cuid()
            .optional(),

        projectId: z
            .string()
            .cuid()
            .optional(),

        quotationId: z
            .string()
            .cuid()
            .optional(),

        uploadedBy: z
            .string()
            .trim()
            .optional(),
    })
    .superRefine((data, ctx) => {
        const linkedEntities = [
            data.productId,
            data.projectId,
            data.quotationId,
        ].filter(Boolean);

        if (linkedEntities.length !== 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Document must belong to exactly one entity (Product, Project or Quotation).",
            });
        }
    });

    export const updateDocumentSchema = z.object({
    name: z
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
        .nativeEnum(DocumentType)
        .optional(),

    uploadedBy: z
        .string()
        .trim()
        .optional(),
});

export type CreateDocumentInput =
    z.infer<typeof createDocumentSchema>;

export type UpdateDocumentInput =
    z.infer<typeof updateDocumentSchema>;

    