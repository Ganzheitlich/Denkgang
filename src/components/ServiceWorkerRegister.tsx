"use client";

import { useEffect } from "react";

/** Registriert den Service Worker fuer PWA-Installierbarkeit; rendert nichts. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}
