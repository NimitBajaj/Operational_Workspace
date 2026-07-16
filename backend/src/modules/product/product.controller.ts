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
}