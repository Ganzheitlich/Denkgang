-- AlterTable
ALTER TABLE "KnowledgeEntry"
  ADD COLUMN "sections" JSONB NOT NULL DEFAULT '[]',
  DROP COLUMN "body";

ALTER TABLE "KnowledgeEntry" ALTER COLUMN "sections" DROP DEFAULT;
