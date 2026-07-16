import { Request, Response } from "express";
import { successResponse } from "../../utils/response";
import { CustomerService } from "./customer.service";

export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    async create(req: Request, res: Response) {
        const customer = await this.customerService.create(req.body);

        return successResponse(res, customer, "Customer created successfully",201);
    }

    async findAll(req: Request, res: Response) {
        const customers = await this.customerService.findAll();

        return successResponse(res, customers, "Customers retrieved successfully");
    }

    async findById(req: Request, res: Response) {
        const customer = await this.customerService.findById(req.params.id as string);

        return successResponse(res, customer, "Customer retrieved successfully");
    }

    async update(req: Request, res: Response) {
        const customer = await this.customerService.update(req.params.id as string, req.body);

        return successResponse(res, customer, "Customer updated successfully");
    }

    async delete(req: Request, res: Response) {
        await this.customerService.delete(req.params.id as string);

        return successResponse(res, null, "Customer deleted successfully");
    }

    

}