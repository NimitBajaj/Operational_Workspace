import { api } from "@/lib/api";

export async function getCustomer(id: string) {
    const response = await api.get(`/customers/${id}`);

    return response.data.data;
}