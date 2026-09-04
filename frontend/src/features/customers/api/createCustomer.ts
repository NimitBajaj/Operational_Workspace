import { api } from "@/lib/api";
import type { CustomerFormValues } from "../components/schemas/customer.schema";

export async function createCustomer(data: CustomerFormValues) {
  const response = await api.post("/customers", data);

  return response.data.data;
}