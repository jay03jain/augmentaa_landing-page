export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>,
) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag(
      "event",
      eventName,
      params,
    );
  }
}
