-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "quotationId" TEXT;

-- CreateIndex
CREATE INDEX "Payment_quotationId_idx" ON "Payment"("quotationId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
