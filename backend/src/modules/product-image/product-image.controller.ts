import { Request, Response } from "express";

import { ProductImageService } from "./product-image.service";
import { successResponse } from "../../utils/response";
import { BadRequestException } from "../../common/errors/bad-request-error";

export class ProductImageController {
    constructor(
        private readonly productImageService: ProductImageService
    ) {}

    async create(req: Request, res: Response) {

    if (!req.file) {
        throw new BadRequestException("Image file is required.");
    }

    const image =
        await this.productImageService.create(
            req.params.productId as string,
            req.file,
            req.body
        );

    return successResponse(
        res,
        image,
        "Product image created successfully.",
        201
    );
}
    async findByProduct(req: Request, res: Response) {
        const images =
            await this.productImageService.findByProduct(
                req.params.productId as string
            );

        return successResponse(
            res,
            images,
            "Product images retrieved successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const image =
            await this.productImageService.findById(
                req.params.id as string
            );

        return successResponse(
            res,
            image,
            "Product image retrieved successfully."
        );
    }

    async update(req: Request, res: Response) {
        const image =
            await this.productImageService.update(
                req.params.id as string,
                req.body
            );

        return successResponse(
            res,
            image,
            "Product image updated successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.productImageService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Product image deleted successfully."
        );
    }
}