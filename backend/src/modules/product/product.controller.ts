import {Request, Response, NextFunction} from 'express';
import { ProductService } from './product.service';

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){} 

    async create(req: Request, res: Response){
        const product = await this.productService.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
}