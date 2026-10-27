"use server";

import { AuthError } from "next-auth";
import { signIn, TooManyAttemptsSignin } from "@/auth";

export async function loginAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof TooManyAttemptsSignin) {
      return "Zu viele Anmeldeversuche. Bitte in ein paar Minuten erneut versuchen.";
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "E-Mail oder Passwort ist falsch.";
        default:
          return "Anmeldung fehlgeschlagen. Bitte erneut versuchen.";
      }
    }
    throw error;
  }
}
