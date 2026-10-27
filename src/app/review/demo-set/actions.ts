"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CASE_SLUGS, KNOWLEDGE_SLUGS } from "./demoSet";

async function requireReviewer() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "REVIEWER" && role !== "ADMIN") {
    throw new Error("Keine Berechtigung.");
  }
}

export async function setDemoSetStatus(status: "APPROVED" | "DRAFT") {
  await requireReviewer();

  await prisma.case.updateMany({ where: { slug: { in: CASE_SLUGS } }, data: { status } });
  await prisma.knowledgeEntry.updateMany({ where: { slug: { in: KNOWLEDGE_SLUGS } }, data: { status } });

  revalidatePath("/review/demo-set");
  revalidatePath("/review");
  revalidatePath("/dashboard");
  revalidatePath("/cases");
  revalidatePath("/library");
}
