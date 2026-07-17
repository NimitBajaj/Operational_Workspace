import { prisma } from "../../lib/prisma";

import { ProjectRepository } from "../project/project.repository";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";

import { QuotationRepository } from "./quotation.repository";
import { QuotationItemRepository } from "./quotation-item.respoitory";

import { QuotationService } from "./quotation.service";
import { QuotationController } from "./quotation.controller";

const projectRepository = new ProjectRepository(prisma);
const productVariantRepository = new ProductVariantRepository(prisma);

const quotationRepository = new QuotationRepository(prisma);
const quotationItemRepository = new QuotationItemRepository(prisma);

const quotationService = new QuotationService(
    prisma,
    quotationRepository,
    quotationItemRepository,
    projectRepository,
    productVariantRepository
);

export const quotationController =
    new QuotationController(quotationService);