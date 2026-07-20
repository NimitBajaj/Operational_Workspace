import { Request, Response } from "express";
import { ProductCategoryService } from "./product-category.service";
import { successResponse } from "../../utils/response";

export class ProductCategoryController {
    constructor(
        private readonly productCategoryService: ProductCategoryService
    ) {}

    async create(req: Request, res: Response) {
        const category = await this.productCategoryService.create(req.body);

        return successResponse(
            res,
            category,
            "Product category created successfully",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const categories = await this.productCategoryService.getAll();

        return successResponse(
            res,
            categories,
            "Product categories retrieved successfully"
        );
    }

    async findById(req: Request, res: Response) {
        const category = await this.productCategoryService.getById(
            req.params.id as string
        );

        return successResponse(
            res,
            category,
            "Product category retrieved successfully"
        );
    }

    async update(req: Request, res: Response) {
        const category = await this.productCategoryService.update(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            category,
            "Product category updated successfully"
        );
    }

    async delete(req: Request, res: Response) {
        await this.productCategoryService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Product category deleted successfully"
        );
    }
}