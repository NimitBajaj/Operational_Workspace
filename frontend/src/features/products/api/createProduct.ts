import { api } from "@/lib/api";

export async function createProduct(data: any) {
  const response = await api.post("/products", data);

  return response.data;
}