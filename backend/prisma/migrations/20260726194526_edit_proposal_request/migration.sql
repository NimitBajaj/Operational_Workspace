/*
  Warnings:

  - A unique constraint covering the columns `[quotationId]` on the table `ProposalRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProposalRequest" ADD COLUMN     "convertedAt" TIMESTAMP(3),
ADD COLUMN     "quotationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProposalRequest_quotationId_key" ON "ProposalRequest"("quotationId");

-- AddForeignKey
ALTER TABLE "ProposalRequest" ADD CONSTRAINT "ProposalRequest_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
