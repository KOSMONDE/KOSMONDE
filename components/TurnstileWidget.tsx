"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
  resetCounter?: number;
  className?: string;
  size?: "normal" | "compact" | "invisible";
  theme?: "auto" | "light" | "dark";
  onReady?: (controls: { execute: () => void; reset: () => void }) => void;
};

export function TurnstileWidget({
  onToken,
  resetCounter,
  className,
  size = "compact",
  theme = "dark",
  onReady,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onToken(token),
      "error-callback": () => onToken(""),
      "expired-callback": () => onToken(""),
      size,
      theme,
    });
    if (widgetIdRef.current && onReady) {
      onReady({
        execute: () => window.turnstile?.execute(widgetIdRef.current ?? ""),
        reset: () => window.turnstile?.reset(widgetIdRef.current ?? ""),
      });
    }
  }, [onReady, onToken, siteKey, size, theme]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
  }, [resetCounter]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className={["flex justify-center", className].filter(Boolean).join(" ")}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} />
    </div>
  );
}
