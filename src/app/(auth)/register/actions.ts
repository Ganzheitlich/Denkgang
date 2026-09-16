"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import type { Role } from "@/generated/prisma/enums";

const registerSchema = z.object({
  email: z.string().email("Bitte eine gueltige E-Mail-Adresse angeben."),
  password: z
    .string()
    .min(8, "Das Passwort muss mindestens 8 Zeichen haben."),
  name: z.string().trim().min(1).max(120).optional(),
});

function initialRole(email: string): Role {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(email.toLowerCase()) ? "ADMIN" : "STUDENT";
}

export async function registerAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name") || undefined,
  });

  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Ungueltige Eingabe.";
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return "Fuer diese E-Mail-Adresse existiert bereits ein Konto.";
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: initialRole(email),
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Konto wurde angelegt, Anmeldung ist aber fehlgeschlagen. Bitte manuell einloggen.";
    }
    throw error;
  }
}
