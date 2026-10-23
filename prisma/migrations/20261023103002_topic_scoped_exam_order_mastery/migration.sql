-- AlterTable
ALTER TABLE "User" DROP COLUMN "examOrderStreak";

-- CreateTable
CREATE TABLE "UserTopicMastery" (
    "userId" TEXT NOT NULL,
    "cluster" TEXT NOT NULL,
    "examOrderStreak" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTopicMastery_pkey" PRIMARY KEY ("userId","cluster")
);

-- AddForeignKey
ALTER TABLE "UserTopicMastery" ADD CONSTRAINT "UserTopicMastery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
