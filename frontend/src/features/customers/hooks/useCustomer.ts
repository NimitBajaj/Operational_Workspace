import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../api/getCustomer";

export function useCustomer(id: string) {
    return useQuery({
        queryKey: ["customer", id],
        queryFn: () => getCustomer(id),
        enabled: !!id,
    });
}