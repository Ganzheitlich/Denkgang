import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/impressum">Impressum</Link>
      <Link href="/datenschutz">Datenschutz</Link>
    </footer>
  );
}
