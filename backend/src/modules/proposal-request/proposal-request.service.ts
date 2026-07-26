import { Prisma, ProposalRequestStatus } from "@prisma/client";

import { ProposalRequestRepository } from "./proposal-request.repository";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";

import {
    CreateProposalRequestInput,
    UpdateProposalRequestInput,
} from "./proposal-request.schema";

import { NotFoundException } from "../../common/errors/not-found-error";
import { ConflictException } from "../../common/errors/conflict-error";

export class ProposalRequestService {
    constructor(
        private readonly proposalRequestRepository: ProposalRequestRepository,
        private readonly productVariantRepository: ProductVariantRepository
    ) {}

    async create(data: CreateProposalRequestInput) {

    const seenVariants = new Set<string>();

    const items: Prisma.ProposalRequestItemCreateWithoutProposalRequestInput[] = [];

    for (const item of data.items) {

        if (seenVariants.has(item.productVariantId)) {
            throw new ConflictException(
                "Duplicate product variants are not allowed."
            );
        }

        seenVariants.add(item.productVariantId);

        const variant =
            await this.productVariantRepository.findById(
                item.productVariantId
            );

        if (!variant) {
            throw new NotFoundException(
                `Product variant "${item.productVariantId}" not found.`
            );
        }

        items.push({
            quantity: item.quantity,

            productName: variant.product.name,

            variantName: [
                variant.wattage,
                variant.colorTemperature,
                variant.finish,
            ]
                .filter(Boolean)
                .join(" - ") || null,

            sku: variant.sku,
            productVariant: {
                connect: {
                    id: variant.id,
                },
            },
        });
    }

    const createData: Prisma.ProposalRequestCreateInput = {

        customerName: data.customerName,

        customerEmail: data.customerEmail,

        customerPhone: data.customerPhone,

        companyName: data.companyName,

        notes: data.notes,

        status: ProposalRequestStatus.PENDING,

        items: {
            create: items,
        },
    };

    return this.proposalRequestRepository.create(createData);
}

async findAll() {
    return this.proposalRequestRepository.findAll();
}


async findById(id: string) {

    const proposal =
        await this.proposalRequestRepository.findById(id);

    if (!proposal) {
        throw new NotFoundException(
            "Proposal request not found."
        );
    }

    return proposal;
}

async update(
    id: string,
    data: UpdateProposalRequestInput
) {

    await this.findById(id);

    const updateData: Prisma.ProposalRequestUpdateInput = {};

    if (data.customerName !== undefined)
        updateData.customerName = data.customerName;

    if (data.customerEmail !== undefined)
        updateData.customerEmail = data.customerEmail;

    if (data.customerPhone !== undefined)
        updateData.customerPhone = data.customerPhone;

    if (data.companyName !== undefined)
        updateData.companyName = data.companyName;

    if (data.notes !== undefined)
        updateData.notes = data.notes;

    return this.proposalRequestRepository.update(
        id,
        updateData
    );
}

async delete(id: string) {

    await this.findById(id);

    return this.proposalRequestRepository.delete(id);
}

}