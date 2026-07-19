import { Prisma } from "@prisma/client";

import { DocumentRepository } from "./document.repository";
import { ProductRepository } from "../product/product.repository";
import { ProjectRepository } from "../project/project.repository";
import { QuotationRepository } from "../quotation/quotation.repository";

import {
    CreateDocumentInput,
    UpdateDocumentInput,
} from "./document.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class DocumentService {
    constructor(
        private readonly documentRepository: DocumentRepository,
        private readonly productRepository: ProductRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly quotationRepository: QuotationRepository
    ) {}

   async create(data: CreateDocumentInput) {

    if (data.productId) {

        const product =
            await this.productRepository.findById(data.productId);

        if (!product) {
            throw new NotFoundException(
                `Product with id "${data.productId}" not found.`
            );
        }
    }

    if (data.projectId) {

        const project =
            await this.projectRepository.findById(data.projectId);

        if (!project) {
            throw new NotFoundException(
                `Project with id "${data.projectId}" not found.`
            );
        }
    }

    if (data.quotationId) {

        const quotation =
            await this.quotationRepository.findById(data.quotationId);

        if (!quotation) {
            throw new NotFoundException(
                `Quotation with id "${data.quotationId}" not found.`
            );
        }
    }

    return this.documentRepository.create({

        name: data.name,

        fileName: data.fileName,

        fileUrl: data.fileUrl,

        fileSize: data.fileSize,

        mimeType: data.mimeType,

        type: data.type,

        description: data.description,

        uploadedBy: data.uploadedBy,

        ...(data.productId && {
            product: {
                connect: {
                    id: data.productId,
                },
            },
        }),

        ...(data.projectId && {
            project: {
                connect: {
                    id: data.projectId,
                },
            },
        }),

        ...(data.quotationId && {
            quotation: {
                connect: {
                    id: data.quotationId,
                },
            },
        }),
    });
}

async findAll() {
    return this.documentRepository.findAll();
}

async findById(id: string) {

    const document =
        await this.documentRepository.findById(id);

    if (!document) {
        throw new NotFoundException(
            `Document with id "${id}" not found.`
        );
    }

    return document;
}

async findByProject(projectId: string) {

    await this.projectRepository.findById(projectId);

    return this.documentRepository.findByProject(projectId);
}

async findByProduct(productId: string) {

    await this.productRepository.findById(productId);

    return this.documentRepository.findByProduct(productId);
}

async findByQuotation(quotationId: string) {

    await this.quotationRepository.findById(quotationId);

    return this.documentRepository.findByQuotation(quotationId);
}

async update(
    id: string,
    data: UpdateDocumentInput
) {

    await this.findById(id);

    return this.documentRepository.update(id, {
        name: data.name,
        description: data.description,
        type: data.type,
        uploadedBy: data.uploadedBy,
    });
}

async delete(id: string) {

    await this.findById(id);

    return this.documentRepository.delete(id);
}

}