/*
  Warnings:

  - You are about to drop the column `examAutoSkipped` on the `CaseSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `examOrderStreak` on the `CaseSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CaseSchedule" DROP COLUMN "examAutoSkipped",
DROP COLUMN "examOrderStreak";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "examOrderStreak" INTEGER NOT NULL DEFAULT 0;
