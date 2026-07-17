import { ProjectStatus } from "@prisma/client";

import { ProjectRepository } from "./project.repository";
import { CustomerRepository } from "../customer/customer.repository";
import { Prisma } from "@prisma/client";
import {
    CreateProjectInput,
    UpdateProjectInput,
} from "./project.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly customerRepository: CustomerRepository
    ) {}

    async create(data: CreateProjectInput) {
        const customer = await this.customerRepository.findById(
            data.customerId
        );

        if (!customer) {
            throw new NotFoundException(
                `Customer with id "${data.customerId}" not found.`
            );
        }

        return this.projectRepository.create({
            title: data.title,
            description: data.description,
            location: data.location,
            projectType: data.projectType,
            priority: data.priority,
            estimatedValue: data.estimatedValue,
            expectedCompletionDate: data.expectedCompletionDate
                ? new Date(data.expectedCompletionDate)
                : undefined,
            actualCompletionDate: data.actualCompletionDate
                ? new Date(data.actualCompletionDate)
                : undefined,

            status: ProjectStatus.LEAD,

            customer: {
                connect: {
                    id: data.customerId,
                },
            },
        });
    }

    async findAll() {
        return this.projectRepository.findAll();
    }

    async findById(id: string) {
        const project = await this.projectRepository.findById(id);

        if (!project) {
            throw new NotFoundException(
                `Project with id "${id}" not found.`
            );
        }

        return project;
    }

    async update(id: string, data: UpdateProjectInput) {
        await this.findById(id);

        const updateData: Prisma.ProjectUpdateInput = {};
        if (data.title !== undefined) {
            updateData.title = data.title;
        }

        if(data.description !== undefined) {
            updateData.description = data.description;
        }

        if (data.location !== undefined) {
    updateData.location = data.location;
}

if (data.projectType !== undefined) {
    updateData.projectType = data.projectType;
}

if (data.priority !== undefined) {
    updateData.priority = data.priority;
}

if (data.estimatedValue !== undefined) {
    updateData.estimatedValue = data.estimatedValue;
}

if (data.expectedCompletionDate !== undefined) {
    updateData.expectedCompletionDate = new Date(data.expectedCompletionDate);
}

if (data.actualCompletionDate !== undefined) {
    updateData.actualCompletionDate = new Date(data.actualCompletionDate);
}

if (data.customerId !== undefined) {
    const customer = await this.customerRepository.findById(data.customerId);

    if (!customer) {
        throw new NotFoundException(
            `Customer with id "${data.customerId}" not found.`
        );
    }

    updateData.customer = {
        connect: {
            id: data.customerId,
        },
    };
}
        return this.projectRepository.update(id, updateData);
    }

    async delete(id: string) {
        await this.findById(id);

        return this.projectRepository.delete(id);
    }
}
