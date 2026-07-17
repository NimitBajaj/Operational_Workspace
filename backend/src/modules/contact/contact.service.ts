import { Prisma } from "@prisma/client";

import { ContactRepository } from "./contact.repository";
import { CustomerRepository } from "../customer/customer.repository";
import { CreateContactInput, UpdateContactInput } from "./contact.schema";
import { NotFoundException } from "../../common/errors/not-found-error";

export class ContactService {
    constructor(private readonly contactRepository: ContactRepository,
        private readonly customerRepository: CustomerRepository
    ) {}

    async create(data: CreateContactInput) {
    const customer = await this.customerRepository.findById(data.customerId);

    if (!customer) {
        throw new NotFoundException(
            `Customer with id "${data.customerId}" not found.`
        );
    }

    if (data.isPrimary) {
        const existingPrimary =
            await this.contactRepository.findPrimaryByCustomer(
                data.customerId
            );

        if (existingPrimary) {
            await this.contactRepository.updatePrimaryStatus(
                existingPrimary.id,
                false
            );
        }
    }

    const createData: Prisma.ContactCreateInput = {
        name: data.name,
        role: data.role,
        phone: data.phone,
        email: data.email,
        company: data.company,
        designation: data.designation,
        address: data.address,
        city: data.city,
        state: data.state,
        notes: data.notes,
        isPrimary: data.isPrimary ?? false,

        customer: {
            connect: {
                id: data.customerId,
            },
        },
    };

    return this.contactRepository.create(createData);
}

async findAll() {
    return this.contactRepository.findAll();
}

async findById(id: string) {
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
        throw new NotFoundException(
            `Contact with id "${id}" not found.`
        );
    }

    return contact;
}

async update(id: string, data: UpdateContactInput) {
    const contact = await this.findById(id);

    const updateData: Prisma.ContactUpdateInput = {};

    if (data.customerId) {
        const customer =
            await this.customerRepository.findById(data.customerId);

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

    if (data.name !== undefined) updateData.name = data.name;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.company !== undefined) updateData.company = data.company;
    if (data.designation !== undefined) updateData.designation = data.designation;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.notes !== undefined) updateData.notes = data.notes;

    if (data.isPrimary !== undefined) {
        if (data.isPrimary) {
            const customerId = data.customerId ?? contact.customerId;

            const existingPrimary =
                await this.contactRepository.findPrimaryByCustomer(customerId);

            if (existingPrimary && existingPrimary.id !== id) {
                await this.contactRepository.updatePrimaryStatus(
                    existingPrimary.id,
                    false
                );
            }
        }

        updateData.isPrimary = data.isPrimary;
    }

    return this.contactRepository.update(id, updateData);
}

async delete(id: string) {
    await this.findById(id);

    return this.contactRepository.delete(id);
}


}