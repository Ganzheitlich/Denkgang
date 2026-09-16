/**
 * Eigenständiges, schlichtes Katze+Hund-Motiv (Strichzeichnung, Duoton
 * Petrol/Ochre) als wiederkehrendes Markenzeichen — bewusst neu gezeichnet,
 * nicht vom Praxis-Logo abgepaust, aber im selben Geist (Tierpaar).
 */
export function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Hund: Kopf + Körper, Petrol */}
      <path
        d="M27 34c0-5.5 3.4-9 7.5-9s7.5 3.5 7.5 9v3.5a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V34Z"
        fill="var(--petrol)"
      />
      <ellipse cx="34.5" cy="21" rx="6" ry="6.5" fill="var(--petrol)" />
      <path d="M29.5 16.5c-1.8-1.2-3-.2-2.6 1.6.3 1.3 1.6 2.4 3 2.6l-.4-4.2Z" fill="var(--petrol)" />
      <path d="M39.5 16.5c1.8-1.2 3-.2 2.6 1.6-.3 1.3-1.6 2.4-3 2.6l.4-4.2Z" fill="var(--petrol)" />
      <circle cx="34.5" cy="22" r="1" fill="var(--paper)" />

      {/* Katze: Kopf + Körper, Ochre */}
      <path
        d="M6 34.5c0-6 4-10 9-10s9 4 9 10v3a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 6 37.5v-3Z"
        fill="var(--ochre)"
      />
      <ellipse cx="15" cy="19.5" rx="5.5" ry="5.5" fill="var(--ochre)" />
      <path d="M11 15.5 9.5 10l4 3.5-2.5 2Z" fill="var(--ochre)" />
      <path d="M19 15.5l1.5-5.5-4 3.5 2.5 2Z" fill="var(--ochre)" />
      <circle cx="15" cy="20.5" r="1" fill="var(--paper)" />

      {/* Boden-Linie */}
      <path d="M3 40.5h42" stroke="var(--line)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
