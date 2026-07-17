import { prisma } from "../../lib/prisma";

import { CustomerRepository } from "../customer/customer.repository";

import { ContactRepository } from "./contact.repository";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";

const customerRepository = new CustomerRepository(prisma);

const contactRepository = new ContactRepository(prisma);

const contactService = new ContactService(
    contactRepository,
    customerRepository
);

export const contactController =
    new ContactController(contactService);