import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "./dashboard.api";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}