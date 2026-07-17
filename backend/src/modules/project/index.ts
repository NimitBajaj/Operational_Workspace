import { ProjectRepository } from "./project.repository";
import { prisma } from "../../lib/prisma";
import { CustomerRepository } from "../customer/customer.repository";
import { ProjectService } from "./project.service";
import { ProjectContoller } from "./project.controller";

const projectRepository = new ProjectRepository(prisma);
const customerRepository = new CustomerRepository(prisma);

const projectService = new ProjectService(
    projectRepository,
    customerRepository
);

export const projectController = new ProjectContoller(projectService);

