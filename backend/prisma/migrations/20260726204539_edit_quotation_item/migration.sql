/*
  Warnings:

  - Added the required column `productName` to the `QuotationItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuotationItem" ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "variantName" TEXT;
