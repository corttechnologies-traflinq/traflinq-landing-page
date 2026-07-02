import type { Locale } from "./config";
import enCommon from "../messages/en/common.json";
import enLanding from "../messages/en/landing.json";
import arCommon from "../messages/ar/common.json";
import arLanding from "../messages/ar/landing.json";

const messagesByLocale = {
  en: { ...enCommon, ...enLanding },
  ar: { ...arCommon, ...arLanding },
} as const;

export function loadMessages(locale: Locale) {
  return messagesByLocale[locale] ?? messagesByLocale.en;
}
