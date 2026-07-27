import { prisma } from "../../lib/prisma";

import { ProposalRequestRepository } from "./proposal-request.repository";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";

import { ProposalRequestService } from "./proposal-request.service";
import { ProposalRequestController } from "./proposal-request.controller";
import { QuotationRepository } from "../quotation/quotation.repository";
import { QuotationItemRepository } from "../quotation/quotation-item.respoitory";

const proposalRequestRepository =
    new ProposalRequestRepository(prisma);

const productVariantRepository =
    new ProductVariantRepository(prisma);

const proposalRequestService =
    new ProposalRequestService(
        proposalRequestRepository,
        productVariantRepository
    );

const quotationRepository = new QuotationRepository(prisma);

const quotationItemRepository = new QuotationItemRepository(prisma);

export const proposalRequestController =
    new ProposalRequestController(
        proposalRequestService
    );