export type PhoneCountry = "Pakistan" | "Saudi Arabia";

const PAKISTAN_MAX_LENGTH = 11;
const SAUDI_MAX_LENGTH = 10;

const PAKISTAN_PHONE_REGEX = /^03\d{9}$/;
const SAUDI_PHONE_REGEX = /^05\d{8}$/;

export const PHONE_MAX_LENGTH = PAKISTAN_MAX_LENGTH;
export const PHONE_PLACEHOLDER = "03001234567";
export const PHONE_VALIDATION_MESSAGE = "Phone number must be exactly 11 digits";

export function getPhoneMaxLength(country: PhoneCountry): number {
  return country === "Saudi Arabia" ? SAUDI_MAX_LENGTH : PAKISTAN_MAX_LENGTH;
}

export function getPhonePlaceholder(country: PhoneCountry): string {
  return country === "Saudi Arabia" ? "0501234567" : "03001234567";
}

export function sanitizePhoneInput(value: string, country: PhoneCountry = "Pakistan"): string {
  return value.replace(/\D/g, "").slice(0, getPhoneMaxLength(country));
}

type PhoneMessages = {
  required: string;
  invalid: string;
};

function isValidPhoneForCountry(digits: string, country: PhoneCountry): boolean {
  if (country === "Saudi Arabia") {
    return SAUDI_PHONE_REGEX.test(digits);
  }
  return PAKISTAN_PHONE_REGEX.test(digits);
}

export function getPhoneValidationError(
  value: string | null | undefined,
  options: { required?: boolean; country?: PhoneCountry; messages?: PhoneMessages } = {},
): string | null {
  const country = options.country ?? "Pakistan";
  const digits = (value ?? "").replace(/\D/g, "");
  const requiredMsg = options.messages?.required ?? "Phone number is required";
  const invalidMsg = options.messages?.invalid ?? PHONE_VALIDATION_MESSAGE;

  if (!digits) {
    return options.required ? requiredMsg : null;
  }
  if (!isValidPhoneForCountry(digits, country)) {
    return invalidMsg;
  }
  return null;
}
