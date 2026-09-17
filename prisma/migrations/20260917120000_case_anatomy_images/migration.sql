-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "einstiegsbildUrl" TEXT,
ADD COLUMN     "befundbildUrl" TEXT;

-- AlterTable
ALTER TABLE "AnatomyItem" ADD COLUMN     "bildUrl" TEXT;
