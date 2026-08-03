export const CUSTOMER_TYPES = [
  "ARCHITECT",
  "BUILDER",
  "CONTRACTOR",
  "OWNER",
] as const;

export type CustomerType =
    typeof CUSTOMER_TYPES[number];