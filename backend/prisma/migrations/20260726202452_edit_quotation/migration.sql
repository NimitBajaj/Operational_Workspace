-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_projectId_fkey";

-- AlterTable
ALTER TABLE "Quotation" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
