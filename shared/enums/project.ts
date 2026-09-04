export const PROJECT_STATUS = [
    "LEAD",
    "SITE_VISIT",
    "QUOTATION_DRAFT",
    "QUOTATION_SENT",
    "NEGOTIATION",
    "ORDER_CONFIRMED",
    "PROCUREMENT",
    "VENDOR_WORK",
    "READY_FOR_DISPATCH",
    "DELIVERED",
    "INSTALLATION",
    "COMPLETED",
    "CANCELLED" 
] as const;

export type ProjectStatus =
    typeof PROJECT_STATUS[number];

export const PRIORITIES = [
  "TOP_PRIORITY",
  "MEDIUM_PRIORITY",
  "LOW_PRIORITY"
] as const;

export type Priority =
    typeof PRIORITIES[number];