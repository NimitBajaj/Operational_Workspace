import { Prisma, PrismaClient, PaymentStatus } from "@prisma/client";

import { PaymentRepository } from "./payment.repository";
import { ProjectRepository } from "../project/project.repository";
import { QuotationRepository } from "../quotation/quotation.repository";

import {
    CreatePaymentInput,
    UpdatePaymentInput,
    MarkPaymentPaidInput,
    FollowUpInput,
} from "./payment.schema";

import { NotFoundException } from "../../common/errors/not-found-error";
import { ConflictException } from "../../common/errors/conflict-error";

export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly quotationRepository: QuotationRepository
    ) {}

    async create(data: CreatePaymentInput) {

    const project = await this.projectRepository.findById(data.projectId);

    if (!project) {
        throw new NotFoundException(
            `Project with id "${data.projectId}" not found.`
        );
    }

    if (data.quotationId) {
        const quotation = await this.quotationRepository.findById(
            data.quotationId
        );

        if (!quotation) {
            throw new NotFoundException(
                `Quotation with id "${data.quotationId}" not found.`
            );
        }
    }

    return this.paymentRepository.create({
        type: data.type,

        amount: new Prisma.Decimal(data.amount),

        dueDate: data.dueDate
            ? new Date(data.dueDate)
            : undefined,

        remarks: data.remarks,

        status: PaymentStatus.PENDING,

        project: {
            connect: {
                id: data.projectId,
            },
        },

        ...(data.quotationId && {
            quotation: {
                connect: {
                    id: data.quotationId,
                },
            },
        }),
    });
}

async findAll() {
    return this.paymentRepository.findAll();
}

async findById(id: string) {

    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
        throw new NotFoundException(
            `Payment with id "${id}" not found.`
        );
    }

    return payment;
}

async update(
    id: string,
    data: UpdatePaymentInput
) {

    await this.findById(id);

    return this.paymentRepository.update(id, {
        dueDate: data.dueDate
            ? new Date(data.dueDate)
            : undefined,

        remarks: data.remarks,
    });
}

async markAsPaid(
    id: string,
    data: MarkPaymentPaidInput
) {

    await this.findById(id);

    const payment = await this.findById(id);

if (payment.status === PaymentStatus.COMPLETED) {
    throw new ConflictException(
        "Payment is already marked as completed."
    );
}

    return this.paymentRepository.update(id, {

        status: PaymentStatus.COMPLETED,

        paidAt: new Date(),

        paymentMethod: data.paymentMethod,

        referenceNumber: data.referenceNumber,
    });
}

async scheduleFollowUp(
    id: string,
    data: FollowUpInput
) {

    await this.findById(id);

    return this.paymentRepository.update(id, {

        followUpDate: new Date(data.followUpDate),
    });
}

async delete(id: string) {

    await this.findById(id);

    return this.paymentRepository.delete(id);
}

}