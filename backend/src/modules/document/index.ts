import { prisma } from "../../lib/prisma";

import { DocumentRepository } from "./document.repository";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";

import { ProductRepository } from "../product/product.repository";
import { ProjectRepository } from "../project/project.repository";
import { QuotationRepository } from "../quotation/quotation.repository";

const documentRepository = new DocumentRepository(prisma);

const productRepository = new ProductRepository(prisma);
const projectRepository = new ProjectRepository(prisma);
const quotationRepository = new QuotationRepository(prisma);

const documentService = new DocumentService(
    documentRepository,
    productRepository,
    projectRepository,
    quotationRepository
);

export const documentController =
    new DocumentController(documentService);