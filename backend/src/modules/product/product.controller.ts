import {Request, Response, NextFunction} from 'express';
import { ProductService } from './product.service';

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){} 

    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) { 
        try {
            const product = await this.productService.create(req.body);

            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            });
        } catch (error) {
            next(error);
        }
    }
}