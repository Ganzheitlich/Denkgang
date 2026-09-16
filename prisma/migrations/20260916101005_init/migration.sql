-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'REVIEWER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "learningObjective" TEXT NOT NULL,
    "anamnese" TEXT NOT NULL,
    "beobachtung" TEXT NOT NULL,
    "diagramLabel" TEXT NOT NULL,
    "palpation" TEXT NOT NULL,
    "hypothesisQ" TEXT NOT NULL,
    "expertNote" TEXT NOT NULL,
    "weakeningQ" TEXT NOT NULL,
    "retrievalQ" TEXT NOT NULL,
    "sourceStatus" TEXT NOT NULL,
    "createdById" TEXT,
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseHypothesisOption" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "errorCategory" TEXT,
    "arguesAgainst" TEXT,
    "differentiationDistractors" TEXT[],

    CONSTRAINT "CaseHypothesisOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseWeakeningOption" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "errorCategory" TEXT,

    CONSTRAINT "CaseWeakeningOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseRetrievalOption" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "errorCategory" TEXT,

    CONSTRAINT "CaseRetrievalOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnatomyItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "relatedCaseId" TEXT,
    "origin" TEXT NOT NULL,
    "insertion" TEXT NOT NULL,
    "funktion" TEXT NOT NULL,
    "innervation" TEXT NOT NULL,
    "clinicalRelevance" TEXT NOT NULL,
    "palpationHint" TEXT NOT NULL,
    "transferQ" TEXT NOT NULL,
    "sourceStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnatomyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnatomyTransferOption" (
    "id" TEXT NOT NULL,
    "anatomyId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "AnatomyTransferOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "storageUrl" TEXT,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaCaseLink" (
    "mediaId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "MediaCaseLink_pkey" PRIMARY KEY ("mediaId","caseId")
);

-- CreateTable
CREATE TABLE "CaseAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "examOrder" JSONB NOT NULL,
    "examPrematureImaging" BOOLEAN NOT NULL DEFAULT false,
    "hypothesisSelected" JSONB NOT NULL,
    "confidence" INTEGER NOT NULL,
    "differentiationChoice" JSONB,
    "weakeningChoiceId" TEXT,
    "retrievalChoiceId" TEXT,
    "explanation" TEXT,
    "explanationFeedback" TEXT,
    "difficultyRating" TEXT,
    "hypothesisCorrect" BOOLEAN NOT NULL,
    "weakeningCorrect" BOOLEAN NOT NULL,
    "retrievalCorrect" BOOLEAN NOT NULL,
    "errorCategories" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseSchedule" (
    "userId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examOrderStreak" INTEGER NOT NULL DEFAULT 0,
    "examAutoSkipped" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseSchedule_pkey" PRIMARY KEY ("userId","caseId")
);

-- CreateTable
CREATE TABLE "AnatomyAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anatomyId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnatomyAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Case_slug_key" ON "Case"("slug");

-- CreateIndex
CREATE INDEX "CaseHypothesisOption_caseId_idx" ON "CaseHypothesisOption"("caseId");

-- CreateIndex
CREATE INDEX "CaseWeakeningOption_caseId_idx" ON "CaseWeakeningOption"("caseId");

-- CreateIndex
CREATE INDEX "CaseRetrievalOption_caseId_idx" ON "CaseRetrievalOption"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "AnatomyItem_slug_key" ON "AnatomyItem"("slug");

-- CreateIndex
CREATE INDEX "AnatomyTransferOption_anatomyId_idx" ON "AnatomyTransferOption"("anatomyId");

-- CreateIndex
CREATE INDEX "CaseAttempt_userId_caseId_idx" ON "CaseAttempt"("userId", "caseId");

-- CreateIndex
CREATE INDEX "AnatomyAttempt_userId_anatomyId_idx" ON "AnatomyAttempt"("userId", "anatomyId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHypothesisOption" ADD CONSTRAINT "CaseHypothesisOption_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseWeakeningOption" ADD CONSTRAINT "CaseWeakeningOption_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseRetrievalOption" ADD CONSTRAINT "CaseRetrievalOption_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnatomyItem" ADD CONSTRAINT "AnatomyItem_relatedCaseId_fkey" FOREIGN KEY ("relatedCaseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnatomyTransferOption" ADD CONSTRAINT "AnatomyTransferOption_anatomyId_fkey" FOREIGN KEY ("anatomyId") REFERENCES "AnatomyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCaseLink" ADD CONSTRAINT "MediaCaseLink_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCaseLink" ADD CONSTRAINT "MediaCaseLink_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseAttempt" ADD CONSTRAINT "CaseAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseAttempt" ADD CONSTRAINT "CaseAttempt_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSchedule" ADD CONSTRAINT "CaseSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSchedule" ADD CONSTRAINT "CaseSchedule_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnatomyAttempt" ADD CONSTRAINT "AnatomyAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnatomyAttempt" ADD CONSTRAINT "AnatomyAttempt_anatomyId_fkey" FOREIGN KEY ("anatomyId") REFERENCES "AnatomyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
