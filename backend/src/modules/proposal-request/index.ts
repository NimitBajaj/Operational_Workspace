import { prisma } from "../../lib/prisma";

import { ProposalRequestRepository } from "./proposal-request.repository";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";

import { ProposalRequestService } from "./proposal-request.service";
import { ProposalRequestController } from "./proposal-request.controller";

const proposalRequestRepository =
    new ProposalRequestRepository(prisma);

const productVariantRepository =
    new ProductVariantRepository(prisma);

const proposalRequestService =
    new ProposalRequestService(
        proposalRequestRepository,
        productVariantRepository
    );

export const proposalRequestController =
    new ProposalRequestController(
        proposalRequestService
    );