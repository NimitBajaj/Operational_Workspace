import {Request, Response, NextFunction} from 'express';
import { ProductService } from './product.service';
import { successResponse } from '../../utils/response';

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){} 

    async create(req: Request, res: Response){
        const product = await this.productService.create(req.body);

       return successResponse
       (res, 
        product, 
        "Product created successfully", 
        201);
    }

    async findAll(req: Request, res: Response){
        const product = await this.productService.findAll();

        return successResponse(
            res,
            product,
            "Proucts retrieved successfully"
        );
    }

    async findById(req: Request, res: Response){
        const product = await this.productService.findById(req.params.id as string);

        return successResponse(
            res,
            product,
            "Products retrieved successfully"
        );
    }

    async update(req: Request, res: Response){
        const product = await this.productService.update(req.params.id as string, req.body);

        return successResponse(
            res,
            product,
            "Product Updated Successfully"
        );
    }

    async delete(req: Request, res: Response){
        const product = await this.productService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Product deleted successfully"
        )
    }

}