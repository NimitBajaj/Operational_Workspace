import { Prisma, ProposalRequestStatus } from "@prisma/client";

import { QuotationItemRepository } from "../quotation/quotation-item.respoitory";
import { ProposalRequestRepository } from "./proposal-request.repository";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";
import { QuotationRepository } from "../quotation/quotation.repository";

import {
    CreateProposalRequestInput,
    UpdateProposalRequestInput,
} from "./proposal-request.schema";

import { NotFoundException } from "../../common/errors/not-found-error";
import { ConflictException } from "../../common/errors/conflict-error";
import { prisma } from "../../lib/prisma";

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

async convert(id: string) {
    const proposal = await this.findById(id);

    if (proposal.status === "CONVERTED") {
        throw new ConflictException(
            "Proposal request has already been converted."
        );
    }

    return prisma.$transaction(async (tx) => {
        const quotationRepository =
    new QuotationRepository(tx);

const quotationItemRepository =
    new QuotationItemRepository(tx);

const proposalRepository =
    new ProposalRequestRepository(tx);

     const quotation =
        await quotationRepository.create({
            quotationNumber: `QT-${Date.now()}`,
        version: 1,
        status: "QUOTATION_DRAFT",

        subtotal: new Prisma.Decimal(0),
        total: new Prisma.Decimal(0),

        discount: new Prisma.Decimal(0),
        gst: new Prisma.Decimal(0),

        remarks: proposal.notes,

        validUntil: null,

        proposalRequest: {
            connect: {
                id: proposal.id,
            },
        },
        });

        let subtotal = new Prisma.Decimal(0);
let gstTotal = new Prisma.Decimal(0);

const quotationItems: Prisma.QuotationItemCreateManyInput[] = [];

for (const item of proposal.items){
    const variant = item.productVariant;

if (!variant) {
    throw new NotFoundException(
        `Product variant not found.`
    );
}

const unitPrice = variant.sellingPrice;

const discount = new Prisma.Decimal(0);

const taxableAmount = unitPrice.minus(discount);

const gst =
    taxableAmount.mul(
        variant.gstPercent.div(100)
    );

const lineTotal =
    taxableAmount
        .plus(gst)
        .mul(item.quantity);

subtotal = subtotal.plus(
    taxableAmount.mul(item.quantity)
);

gstTotal = gstTotal.plus(
    gst.mul(item.quantity)
);

quotationItems.push({
    quotationId: quotation.id,

    productVariantId: variant.id,

    productName: item.productName,
    variantName: item.variantName,
    sku: item.sku,

    displayName:
        item.variantName
            ? `${item.productName} - ${item.variantName}`
            : item.productName,

    quantity: item.quantity,

    unitPrice,

    discount,

    gst,

    lineTotal,

    remarks: null,
});
}

await quotationItemRepository.createMany(
    quotationItems
);

const total = subtotal.plus(gstTotal);

await quotationRepository.update(
    quotation.id,
    {
        subtotal,
        gst: gstTotal,
        total,
    }
);

await proposalRepository.markConverted(
    proposal.id,
    quotation.id
);

return quotationRepository.findById(
    quotation.id
);
    });
}
}   

