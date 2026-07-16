import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "./customer.repository";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { validate } from "../../middleware/validation.middleware";
import { asyncHandler } from "../../utils/async-handler";
import {createCustomerSchema, updateCustomerSchema} from "./customer.schema"
import { runInNewContext } from "vm";

const prisma = new PrismaClient();
const customerRepository = new CustomerRepository(prisma);
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);
const router = Router();

router.post(
    "/",
    validate(createCustomerSchema),
    asyncHandler((req, res, next) => customerController.create(req, res))
);

router.get(
    "/",
    asyncHandler((req,res,next) => customerController.findAll(req,res))
);

router.get(
    "/:id",
    asyncHandler((req,res,next) => customerController.findById(req,res))
);

router.patch(
    "/:id",
    validate(updateCustomerSchema),
    asyncHandler((req,res,next) => customerController.update(req,res) )
);

router.delete(
    "/:id",
    asyncHandler((req,res,next) => customerController.delete(req,res))
);

export default router;