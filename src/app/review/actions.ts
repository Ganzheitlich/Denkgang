"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type ContentKind = "case" | "anatomy" | "media" | "knowledge";

async function requireReviewer() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "REVIEWER" && role !== "ADMIN") {
    throw new Error("Keine Berechtigung.");
  }
}

export async function setContentStatus(kind: ContentKind, id: string, status: "DRAFT" | "APPROVED") {
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
