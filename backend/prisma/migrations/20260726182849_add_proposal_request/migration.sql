-- CreateEnum
CREATE TYPE "ProposalRequestStatus" AS ENUM ('PENDING', 'REVIEWING', 'CONVERTED', 'REJECTED');

-- CreateTable
CREATE TABLE "ProposalRequest" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "companyName" TEXT,
    "status" "ProposalRequestStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProposalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalRequestItem" (
    "id" TEXT NOT NULL,
    "proposalRequestId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProposalRequestItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProposalRequestItem" ADD CONSTRAINT "ProposalRequestItem_proposalRequestId_fkey" FOREIGN KEY ("proposalRequestId") REFERENCES "ProposalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalRequestItem" ADD CONSTRAINT "ProposalRequestItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
