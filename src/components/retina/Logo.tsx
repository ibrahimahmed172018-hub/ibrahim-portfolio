import { useState, useEffect } from "react";
import logoAsset from "@/assets/retina-logo.asset.json";
import { getPublicPlatformSettingsFn } from "@/lib/api";

export function RetinaLogo({ className = "h-9 w-auto" }: { className?: string }) {
  const [hasError, setHasError] = useState(false);

  // Start with empty string on both server & client to avoid hydration mismatch.
  // We populate via useEffect (client-only) from localStorage → then API.
  const [customLogo, setCustomLogo] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    // Helper: read logo from localStorage
    const readLocalLogo = (): string => {
      try {
        const saved = localStorage.getItem("retina_platform_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed?.logoUrl || parsed?.platformLogo || "";
        }
      } catch {}
      return "";
    };

    // Helper: write settings back to localStorage
    const persistSettings = (settings: Record<string, unknown>) => {
      try {
        const existing = localStorage.getItem("retina_platform_settings");
        const base = existing ? JSON.parse(existing) : {};
        localStorage.setItem("retina_platform_settings", JSON.stringify({ ...base, ...settings }));
      } catch {}
    };

    // 1. Read from localStorage immediately (fast, synchronous)
    const localLogo = readLocalLogo();
    if (localLogo && isMounted) {
      setCustomLogo(localLogo);
      setHasError(false);
    }

    // 2. Always fetch from DB to get the authoritative latest logo
    void getPublicPlatformSettingsFn()
      .then((res) => {
        if (!isMounted) return;
        if (res?.success && res?.settings) {
          const fetchedLogo = res.settings.logoUrl || (res.settings as any)?.platformLogo || "";
          setCustomLogo(fetchedLogo);
          setHasError(false);
          persistSettings(res.settings as Record<string, unknown>);
        }
      })
      .catch(() => {
        // API failed — keep whatever we had from localStorage (or show default)
      });

    // 3. Listen for updates from admin in the SAME tab
    const handleCustomUpdate = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      const newLogo = detail?.logoUrl ?? detail?.platformLogo;
      if (newLogo !== undefined && isMounted) {
        setCustomLogo(newLogo);
        setHasError(false);
      }
    };

    // 4. Listen for localStorage changes from OTHER tabs (native storage event)
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === "retina_platform_settings" && e.newValue && isMounted) {
        try {
          const parsed = JSON.parse(e.newValue);
          const newLogo = parsed?.logoUrl ?? parsed?.platformLogo;
          if (newLogo !== undefined) {
            setCustomLogo(newLogo);
            setHasError(false);
          }
        } catch {}
      }
    };

    window.addEventListener("retina_platform_settings_updated", handleCustomUpdate);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      isMounted = false;
      window.removeEventListener("retina_platform_settings_updated", handleCustomUpdate);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  if (hasError) {
    return (
      <div className="inline-flex items-center gap-2 font-bold text-lg text-foreground">
        <RetinaMark className="h-8 w-8" />
        <span>RETINA</span>
      </div>
    );
  }

  const logoSrc = customLogo || logoAsset.url;

  return (
    <img
      src={logoSrc}
      alt="Retina LMS"
      className={`${className} object-contain shrink-0 max-h-full transition-opacity duration-200 opacity-100`}
      onError={() => setHasError(true)}
    />
  );
}

export function RetinaMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground ${className}`}
    >
      <span className="font-black text-sm tracking-tight">R</span>
      <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  );
}
