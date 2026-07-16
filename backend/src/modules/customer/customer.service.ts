import {Prisma} from '@prisma/client';
import { CustomerRepository } from './customer.repository';
import { ConflictException } from '../../common/errors/conflict-error';
import { NotFoundException } from '../../common/errors/not-found-error';

export class CustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async create(data: Prisma.CustomerCreateInput) {
        const [existingEmail, existingPhone] = await Promise.all([
    this.customerRepository.findByEmail(data.email),
    this.customerRepository.findbyPhone(data.phone),
]);

        if (existingEmail) {
            throw new ConflictException('Customer with email "${data.email}" already exists');
        }

        if (existingPhone) {
            throw new ConflictException('Customer with phone "${data.phone}" already exists');
        }

        return this.customerRepository.create(data);
    }

    async findAll() {
        return this.customerRepository.findAll();
    }

    async findById(id: string) {
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new NotFoundException(`Customer with id "${id}" not found`);
        }

        return customer;
    }

    async update(id: string, data: Prisma.CustomerUpdateInput) {
        const customer = await this.findById(id);
        if(
            data.email && data.email !== customer?.email
        ) {
            const existingEmail = await this.customerRepository.findByEmail(data.email as string);

            if (existingEmail) {
                throw new ConflictException(`Customer with email "${data.email}" already exists`);
            }
        }

        if (
            data.phone && data.phone !== customer?.phone
        ) {
            const existingPhone = await this.customerRepository.findbyPhone(data.phone as string);
            if (existingPhone) {
                throw new ConflictException(`Customer with phone "${data.phone}" already exists`);
            }
        }

        return this.customerRepository.update(id, data);
}

    async delete(id: string) {
        await this.findById(id); // Check if customer exists
        return this.customerRepository.delete(id);
    }
}