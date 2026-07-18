import { prisma } from "../../lib/prisma";

import { PaymentRepository } from "./payment.repository";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

import { ProjectRepository } from "../project/project.repository";
import { QuotationRepository } from "../quotation/quotation.repository";

const paymentRepository = new PaymentRepository(prisma);
const projectRepository = new ProjectRepository(prisma);
const quotationRepository = new QuotationRepository(prisma);

const paymentService = new PaymentService(
    paymentRepository,
    projectRepository,
    quotationRepository
);

export const paymentController = new PaymentController(
    paymentService
);