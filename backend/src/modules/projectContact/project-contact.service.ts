import { ProjectContactRepository } from "./project-contact.repository";
import { ProjectRepository } from "../project/project.repository";
import { ContactRepository } from "../contact/contact.repository";

import { CreateProjectContactInput } from "./project-contact.schema";

import { NotFoundException } from "../../common/errors/not-found-error";
import { ConflictException } from "../../common/errors/conflict-error";

export class ProjectContactService {
    constructor(
        private readonly projectContactRepository: ProjectContactRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly contactRepository: ContactRepository
    ) {}

    async create(data: CreateProjectContactInput) {

    const project = await this.projectRepository.findById(
        data.projectId
    );

    if (!project) {
        throw new NotFoundException(
            `Project with id "${data.projectId}" not found.`
        );
    }

    const contact = await this.contactRepository.findById(
        data.contactId
    );

    if (!contact) {
        throw new NotFoundException(
            `Contact with id "${data.contactId}" not found.`
        );
    }

    const existing =
        await this.projectContactRepository.find(
            data.projectId,
            data.contactId
        );

    if (existing) {
        throw new ConflictException(
            "Contact is already linked to this project."
        );
    }

    if(contact.customerId !== project.customerId){
        throw new ConflictException(
            "The contact belongs to a different customer."
        );
    }

    return this.projectContactRepository.create({
        project: {
            connect: {
                id: data.projectId,
            },
        },
        contact: {
            connect: {
                id: data.contactId,
            },
        },
    });
}

async findByProject(projectId: string) {

    const project =
        await this.projectRepository.findById(projectId);

    if (!project) {
        throw new NotFoundException(
            `Project with id "${projectId}" not found.`
        );
    }

    return this.projectContactRepository.findByProject(
        projectId
    );
}

async findByContact(contactId: string) {

    const contact =
        await this.contactRepository.findById(contactId);

    if (!contact) {
        throw new NotFoundException(
            `Contact with id "${contactId}" not found.`
        );
    }

    return this.projectContactRepository.findByContact(
        contactId
    );
}

async delete(
    projectId: string,
    contactId: string
) {

    const existing =
        await this.projectContactRepository.find(
            projectId,
            contactId
        );

    if (!existing) {
        throw new NotFoundException(
            "Project contact mapping not found."
        );
    }

    return this.projectContactRepository.delete(
        projectId,
        contactId
    );
}


}