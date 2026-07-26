import { ProductRepository } from "../product/product.repository";

import { CreateProposalCartInput } from "./proposal-cart.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class ProposalCartService {
    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    async previewCart(data: CreateProposalCartInput) {
        const items = await Promise.all(
            data.items.map(async item => {
                const product =
                    await this.productRepository.findCatalogueBySlug(
                        ""
                    );

                const productById =
                    await this.productRepository.findById(
                        item.productId
                    );

                if (!productById) {
                    throw new NotFoundException(
                        "Product not found."
                    );
                }

                return {
                    productId: productById.id,
                    productName: productById.name,
                    quantity: item.quantity,
                };
            })
        );

        return {
            items,
            totalItems: items.length,
        };
    }
}