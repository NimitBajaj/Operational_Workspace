export const QUOTATION_STATUS = [
  "QUOTATION_DRAFT",
  "QUOTATION_SENT",
  "APPROVED",
  "REJECTED",
  "REVISION"
] as const;

export type QuotationStatus =
    typeof QUOTATION_STATUS[number];