import { api } from "@/lib/api";

export async function getCustomers() {
    const response = await api.get("/customers");

    return response.data.data;
}