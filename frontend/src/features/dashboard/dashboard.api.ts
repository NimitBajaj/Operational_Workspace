import { api } from "@/lib/api";

export async function getDashboard() {

  console.log("Fetchin dashboard...");

  const response = await api.get("/dashboard");

  console.log("Response: ", response.data);
  
  return response.data.data;
}