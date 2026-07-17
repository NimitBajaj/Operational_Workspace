import { Request, Response } from "express";
import { ProductVariantService } from "./product-variant.service";
import { successResponse } from "../../utils/response";

export class ProductVariantController {
    constructor(
        private readonly productVariantService: ProductVariantService
    ) {}

    async create(req: Request, res: Response) {
        const variant = await this.productVariantService.create(req.body);

        return successResponse(
            res,
            variant,
            "Product variant created successfully",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const variants = await this.productVariantService.findAll();

        return successResponse(
            res,
            variants,
            "Product variants fetched successfully"
        );
    }

    async findById(req: Request, res: Response) {
        const variant = await this.productVariantService.findById(req.params.id as string);

        return successResponse(
            res,
            variant,
            "Product variant fetched successfully"
        );
    }

    async update(req: Request, res: Response) {
        const variant = await this.productVariantService.update(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            variant,
            "Product variant updated successfully"
        );
    }

    async delete(req: Request, res: Response) {
        await this.productVariantService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Product variant deleted successfully"
        );
    }
}
