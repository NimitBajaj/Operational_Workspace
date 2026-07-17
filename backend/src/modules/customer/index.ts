import { prisma } from "../../lib/prisma";
import { CustomerRepository } from "./customer.repository";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

const customerRepository = new CustomerRepository(prisma);
const customerService = new CustomerService(customerRepository);


export const customerController = new CustomerController(customerService);

