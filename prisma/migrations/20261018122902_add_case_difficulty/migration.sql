-- CreateEnum
CREATE TYPE "CaseDifficulty" AS ENUM ('EINSTEIGER', 'FORTGESCHRITTEN', 'EXPERTE');

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "difficulty" "CaseDifficulty" NOT NULL DEFAULT 'FORTGESCHRITTEN';
