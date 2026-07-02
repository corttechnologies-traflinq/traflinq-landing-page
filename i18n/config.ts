export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_STORAGE_KEY = "traflinq-landing-locale";

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}
