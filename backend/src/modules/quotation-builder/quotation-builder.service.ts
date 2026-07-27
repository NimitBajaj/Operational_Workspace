import { Prisma } from "@prisma/client";
import { ProposalRequestRepository } from "../proposal-request/proposal-request.repository";
import { QuotationRepository } from "../quotation/quotation.repository";
import { QuotationItemRepository } from "../quotation/quotation-item.respoitory";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";
import { prisma } from "../../lib/prisma";
import { NotFoundException } from "../../common/errors/not-found-error";

export class QuotationBuilderService {
    constructor(){}

    async build(input: BuildQuotationInput){
        return prisma.$transaction(async (tx) => {

    const quotationRepository =
        new QuotationRepository(tx);

    const quotationItemRepository =
        new QuotationItemRepository(tx);

    const productVariantRepository =
        new ProductVariantRepository(tx);

    const proposalRepository =
        new ProposalRequestRepository(tx);

    const quotation =
    await quotationRepository.create({

        quotationNumber: `QT-${Date.now()}`,

        version: 1,

        status: "QUOTATION_DRAFT",

        subtotal: new Prisma.Decimal(0),

        discount: new Prisma.Decimal(0),

        gst: new Prisma.Decimal(0),

        total: new Prisma.Decimal(0),

        remarks: input.remarks,

        validUntil: null,

        ...(input.projectId && {
            project: {
                connect: {
                    id: input.projectId,
                },
            },
        }),

        ...(input.proposalRequestId && {
            proposalRequest: {
                connect: {
                    id: input.proposalRequestId,
                },
            },
        }),
    });

    let subtotal = new Prisma.Decimal(0);
let gstTotal = new Prisma.Decimal(0);

const quotationItems: Prisma.QuotationItemCreateManyInput[] = [];

for (const item of input.items) {

    const variant =
        await productVariantRepository.findById(
            item.productVariantId
        );

    if (!variant) {
        throw new NotFoundException(
            `Product variant ${item.productVariantId} not found.`
        );
    }

    const unitPrice = variant.sellingPrice;

    const discount = new Prisma.Decimal(0);

    const taxableAmount =
        unitPrice.minus(discount);

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

        productName: variant.product.name,

        variantName:
            [
                variant.wattage,
                variant.colorTemperature,
                variant.finish,
            ]
                .filter(Boolean)
                .join(" - "),

        sku: variant.sku,

        displayName:
            `${variant.product.name} ${
                [
                    variant.wattage,
                    variant.colorTemperature,
                    variant.finish,
                ]
                    .filter(Boolean)
                    .join(" - ")
            }`,

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

if (input.proposalRequestId) {
    await proposalRepository.markConverted(
        input.proposalRequestId,
        quotation.id
    );
}

return quotationRepository.findById(
    quotation.id
);

});

    }
}

export interface QuotationBuilderItem {
    productVariantId: string;
    quantity: number;
}

export interface BuildQuotationInput {
    remarks?: string;
    proposalRequestId?: string;
    projectId?: string;
    items: QuotationBuilderItem[];
}