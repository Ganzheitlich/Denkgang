import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { hashResetToken } from "@/lib/passwordResetToken";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default async function ResetPasswordPage({ params }: PageProps<"/reset-password/[token]">) {
  const { token } = await params;

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) },
  });
  const valid = !!resetToken && !resetToken.usedAt && resetToken.expiresAt > new Date();

  return (
    <div className="auth-shell">
      <div className="auth-logo auth-logo-compact">
        <Image
          src="/denkgang-logo-full.png"
          alt="Denkgang — Klinisches Denken trainieren für Tiertherapeuten"
          width={1033}
          height={1020}
          className="logo-img"
        />
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Neues Passwort setzen</h3>
        {valid ? (
          <ResetPasswordForm token={token} />
        ) : (
          <>
            <p style={{ marginTop: 0 }}>
              Dieser Link ist ungültig oder abgelaufen. Fordere einen neuen Link an.
            </p>
            <div className="btn-row">
              <Link href="/forgot-password" className="btn-primary">
                Neuen Link anfordern
              </Link>
            </div>
          </>
        )}
      </div>
      <p className="auth-switch">
        <Link href="/login">← Zurück zur Anmeldung</Link>
      </p>
    </div>
  );
}
