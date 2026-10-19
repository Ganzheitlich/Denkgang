"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { ContentStatus } from "@/generated/prisma/enums";

type ContentKind = "case" | "anatomy" | "media" | "knowledge";

async function requireReviewer() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "REVIEWER" && role !== "ADMIN") {
    throw new Error("Keine Berechtigung.");
  }
}

export async function setContentStatus(kind: ContentKind, id: string, status: ContentStatus) {
  await requireReviewer();

  if (kind === "case") {
    await prisma.case.update({ where: { id }, data: { status } });
  } else if (kind === "anatomy") {
    await prisma.anatomyItem.update({ where: { id }, data: { status } });
  } else if (kind === "knowledge") {
    await prisma.knowledgeEntry.update({ where: { id }, data: { status } });
  } else {
    await prisma.mediaAsset.update({ where: { id }, data: { status } });
  }

  revalidatePath("/review");
  revalidatePath("/dashboard");
}

export async function bulkSetContentStatus(kind: ContentKind, ids: string[], status: ContentStatus) {
  await requireReviewer();
  if (ids.length === 0) return;

  if (kind === "case") {
    await prisma.case.updateMany({ where: { id: { in: ids } }, data: { status } });
  } else if (kind === "anatomy") {
    await prisma.anatomyItem.updateMany({ where: { id: { in: ids } }, data: { status } });
  } else if (kind === "knowledge") {
    await prisma.knowledgeEntry.updateMany({ where: { id: { in: ids } }, data: { status } });
  } else {
    await prisma.mediaAsset.updateMany({ where: { id: { in: ids } }, data: { status } });
  }

  revalidatePath("/review");
  revalidatePath("/dashboard");
}
