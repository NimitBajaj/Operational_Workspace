import { ProductRepository } from "../product/product.repository";
import { ProductCategoryRepository } from "../product-category/product-category.repository";
import { NotFoundException } from "../../common/errors/not-found-error";

export class CatalogueService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: ProductCategoryRepository
    ) {}

    async getCatalogue() {
        const categories =
            await this.categoryRepository.findAllActive();

        const products =
            await this.productRepository.findCatalogueProducts();

        return categories.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,

            products: products
                .filter(
                    p => p.categoryId === category.id
                )
                .map(product => ({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    shortDescription:
                        product.shortDescription,

                    featuredImage:
                        product.images.length
                            ? product.images[0].imageUrl
                            : null,
                })),
        }));
    }

    async getProduct(slug: string) {
    const product =
        await this.productRepository.findCatalogueBySlug(
            slug
        );

    if (!product || !product.active) {
        throw new NotFoundException(
            "Product not found."
        );
    }

    return {
        id: product.id,

        name: product.name,

        slug: product.slug,

        shortDescription:
            product.shortDescription,

        description:
            product.description,

        warranty:
            product.warranty,

        featured:
            product.featured,

        category: {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
        },

        images:
            product.images.map(image => ({
                  id: image.id,
    imageUrl: image.imageUrl,
    altText: image.altText,
    isPrimary: image.isPrimary,
    sortOrder: image.sortOrder,
            })),

        variants:
            product.variants.map(variant => ({
                    id: variant.id,

    wattage: variant.wattage,

    colorTemperature: variant.colorTemperature,

    finish: variant.finish,

    beamAngle: variant.beamAngle,

    cutout: variant.cutout,

    dimensions: variant.dimensions,

    voltage: variant.voltage,

    ipRating: variant.ipRating,

    cri: variant.cri,
            })),
    };
}

}