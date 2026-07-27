import { Prisma, PrismaClient, QuotationStatus } from "@prisma/client";

import { QuotationRepository } from "./quotation.repository";
import { QuotationItemRepository } from "./quotation-item.respoitory";
import { ProductVariantRepository } from "../product-variant/product-variant.repository";
import { ProjectRepository } from "../project/project.repository";
import { QuotationBuilderService } from "../quotation-builder/quotation-builder.service";

import {
    CreateManualQuotationInput,
} from "./create-manual-quotation.schema";

import { CreateQuotationInput } from "./quotation.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class QuotationService {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly quotationRepository: QuotationRepository,
        private readonly quotationItemRepository: QuotationItemRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly productVariantRepository: ProductVariantRepository
    ) {}

    private async generateQuotationNumber() {
        const count = await this.prisma.quotation.count();

        return `Q-${new Date().getFullYear()}-${String(count + 1).padStart(5, "0")}`;
    }

    async create(data: CreateQuotationInput) {
        const project = await this.projectRepository.findById(data.projectId);

        if (!project) {
            throw new NotFoundException(
                `Project with id "${data.projectId}" not found.`
            );
        }

        const quotationNumber = await this.generateQuotationNumber();

        return this.prisma.$transaction(async (tx) => {
            const quotationRepository = new QuotationRepository(tx);
            const quotationItemRepository = new QuotationItemRepository(tx);
            const productVariantRepository = new ProductVariantRepository(tx);

            const ZERO = new Prisma.Decimal(0);

            const quotation = await quotationRepository.create({
                quotationNumber,
                version: 1,
                status: QuotationStatus.QUOTATION_DRAFT,

                subtotal: ZERO,
                discount: new Prisma.Decimal(data.discount ?? 0),
                gst: ZERO,
                total: ZERO,

                validUntil: data.validUntil
                    ? new Date(data.validUntil)
                    : undefined,

                remarks: data.remarks,

                isCurrent: true,

                project: {
                    connect: {
                        id: data.projectId,
                    },
                },
            });

            let subtotal = ZERO;
            let gst = ZERO;

            for (const item of data.items) {
                const variant = await productVariantRepository.findById(
                    item.productVariantId
                );

                if (!variant) {
                    throw new NotFoundException(
                        `Product Variant "${item.productVariantId}" not found`
                    );
                }

                const unitPrice = variant.sellingPrice;

                const quantity = new Prisma.Decimal(item.quantity);

                const lineSubtotal = unitPrice.mul(quantity);

                const lineDiscount = new Prisma.Decimal(item.discount ?? 0);

                const taxable = lineSubtotal.sub(lineDiscount);

                const lineGST = taxable
                    .mul(variant.gstPercent)
                    .div(100);

                const lineTotal = taxable.add(lineGST);

               const variantName = [
    variant.wattage,
    variant.colorTemperature,
    variant.finish,
]
    .filter(Boolean)
    .join(" - ");

await quotationItemRepository.create({
    productName: variant.product.name,

    variantName,

    sku: variant.sku,

    displayName: variantName
        ? `${variant.product.name} - ${variantName}`
        : variant.product.name,

    quantity: item.quantity,

    unitPrice,

    discount: lineDiscount,

    gst: lineGST,

    lineTotal,

    remarks: item.remarks,

    quotation: {
        connect: {
            id: quotation.id,
        },
    },

    productVariant: {
        connect: {
            id: variant.id,
        },
    },
});

                subtotal = subtotal.add(taxable);
                gst = gst.add(lineGST);
            }

            const quotationDiscount = new Prisma.Decimal(
                data.discount ?? 0
            );

            const total = subtotal
                .sub(quotationDiscount)
                .add(gst);

            await quotationRepository.update(quotation.id, {
                subtotal,
                gst,
                total,
            });

            return quotationRepository.findById(quotation.id);
        });
    }

    async findAll() {
    return this.quotationRepository.findAll();
}

async findById(id: string) {
    const quotation = await this.quotationRepository.findById(id);

    if (!quotation) {
        throw new NotFoundException(
            `Quotation with id "${id}" not found.`
        );
    }

    return quotation;
}

async delete(id: string) {
    await this.findById(id);

    return this.prisma.$transaction(async (tx) => {
        const quotationRepository = new QuotationRepository(tx);
        const quotationItemRepository = new QuotationItemRepository(tx);

        await quotationItemRepository.deleteByQuotation(id);

        return quotationRepository.delete(id);
    });
}

async createManualQuotation(
    data: CreateManualQuotationInput
) {
    const quotationBuilder =
        new QuotationBuilderService();

    return quotationBuilder.build({
        projectId: data.projectId,
        remarks: data.remarks,
        items: data.items,
    });
}

}
