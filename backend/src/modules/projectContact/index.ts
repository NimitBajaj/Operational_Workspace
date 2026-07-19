import { prisma } from "../../lib/prisma";

import { ProjectRepository } from "../project/project.repository";
import { ContactRepository } from "../contact/contact.repository";

import { ProjectContactRepository } from "./project-contact.repository";

import { ProjectContactService } from "./project-contact.service";
import { ProjectContactController } from "./project-contact.controller";

const projectRepository = new ProjectRepository(prisma);
const contactRepository = new ContactRepository(prisma);
const projectContactRepository = new ProjectContactRepository(prisma);

const projectContactService = new ProjectContactService(
    projectContactRepository,
    projectRepository,
    contactRepository
);

export const projectContactController =
    new ProjectContactController(projectContactService);