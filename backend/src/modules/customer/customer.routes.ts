import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "./customer.repository";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { validate } from "../../middleware/validation.middleware";
import { asyncHandler } from "../../utils/async-handler";
import {createCustomerSchema, updateCustomerSchema} from "./customer.schema"
import { runInNewContext } from "vm";
import { customerController } from ".";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "SALES"),
    validate(createCustomerSchema),
    asyncHandler((req, res, next) => customerController.create(req, res))
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "SALES"),
    asyncHandler((req,res,next) => customerController.findAll(req,res))
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "SALES"),
    asyncHandler((req,res,next) => customerController.findById(req,res))
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN", "SALES"),
    validate(updateCustomerSchema),
    asyncHandler((req,res,next) => customerController.update(req,res) )
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req,res,next) => customerController.delete(req,res))
);

export default router;