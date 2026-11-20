"use client";

import { useEffect, useState } from "react";
import { DEFAULT_VIEW, loadView, saveView, type ViewPrefs } from "@/lib/viewStorage";

export function usePersistedView() {
  const [view, setView] = useState<ViewPrefs>(DEFAULT_VIEW);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setView(loadView(window.localStorage));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveView(window.localStorage, view);
  }, [view, hydrated]);

  return [view, setView] as const;
}
