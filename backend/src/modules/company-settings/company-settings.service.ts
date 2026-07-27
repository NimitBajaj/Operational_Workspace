import { Prisma } from "@prisma/client";

import { CompanySettingsRepository } from "./company-settings.repository";

import {
    CreateCompanySettingsInput,
    UpdateCompanySettingsInput,
} from "./company-settings.schema";

import { ConflictException } from "../../common/errors/conflict-error";
import { NotFoundException } from "../../common/errors/not-found-error";

export class CompanySettingsService {
    constructor(
        private readonly companySettingsRepository: CompanySettingsRepository
    ) {}

    async create(data: CreateCompanySettingsInput) {
        const existing =
            await this.companySettingsRepository.find();

        if (existing) {
            throw new ConflictException(
                "Company settings already exist."
            );
        }

        const createData: Prisma.CompanySettingsCreateInput = {
            ...data,
        };

        return this.companySettingsRepository.create(createData);
    }

    async find() {
        const settings =
            await this.companySettingsRepository.find();

        if (!settings) {
            throw new NotFoundException(
                "Company settings not found."
            );
        }

        return settings;
    }

    async update(data: UpdateCompanySettingsInput) {
        const settings =
            await this.companySettingsRepository.find();

        if (!settings) {
            throw new NotFoundException(
                "Company settings not found."
            );
        }

        const updateData: Prisma.CompanySettingsUpdateInput = {
            ...data,
        };

        return this.companySettingsRepository.update(
            settings.id,
            updateData
        );
    }
}