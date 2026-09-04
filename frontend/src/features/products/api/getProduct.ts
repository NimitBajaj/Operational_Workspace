import { api } from "@/lib/api";

export async function getProduct(id: string) {
    const response = await api.get(`/products/${id}`);

    return response.data.data;
}