-- CreateEnum
CREATE TYPE "KnowledgeCategory" AS ENUM ('ANATOMIE', 'BIOMECHANIK', 'PATHOLOGIE', 'UNTERSUCHUNG', 'THERAPIE', 'GRUNDLAGEN');

-- CreateTable
CREATE TABLE "KnowledgeEntry" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "KnowledgeCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "teaser" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "errorTags" TEXT[],
    "sourceStatus" TEXT NOT NULL,
    "bildUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeCaseLink" (
    "knowledgeId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "KnowledgeCaseLink_pkey" PRIMARY KEY ("knowledgeId","caseId")
);

-- CreateTable
CREATE TABLE "KnowledgeAnatomyLink" (
    "knowledgeId" TEXT NOT NULL,
    "anatomyId" TEXT NOT NULL,

    CONSTRAINT "KnowledgeAnatomyLink_pkey" PRIMARY KEY ("knowledgeId","anatomyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeEntry_slug_key" ON "KnowledgeEntry"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeEntry_category_idx" ON "KnowledgeEntry"("category");

-- CreateIndex
CREATE INDEX "KnowledgeCaseLink_caseId_idx" ON "KnowledgeCaseLink"("caseId");

-- CreateIndex
CREATE INDEX "KnowledgeAnatomyLink_anatomyId_idx" ON "KnowledgeAnatomyLink"("anatomyId");

-- AddForeignKey
ALTER TABLE "KnowledgeCaseLink" ADD CONSTRAINT "KnowledgeCaseLink_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "KnowledgeEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeCaseLink" ADD CONSTRAINT "KnowledgeCaseLink_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeAnatomyLink" ADD CONSTRAINT "KnowledgeAnatomyLink_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "KnowledgeEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeAnatomyLink" ADD CONSTRAINT "KnowledgeAnatomyLink_anatomyId_fkey" FOREIGN KEY ("anatomyId") REFERENCES "AnatomyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
