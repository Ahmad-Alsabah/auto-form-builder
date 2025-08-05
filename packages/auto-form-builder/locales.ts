export const defaultMessages = {
  ar: {
    required: "هذا الحقل مطلوب",
    minLength: (min: number) => `الطول ≥ ${min} أحرف`,
    maxLength: (max: number) => `الطول ≤ ${max} حرف`,
    minValue: (min: number) => `القيمة يجب أن تكون ≥ ${min}`,
    maxValue: (max: number) => `القيمة يجب أن تكون ≤ ${max}`,
    pattern: "القيمة لا تطابق النمط المطلوب",
    submitFailed: "فشل إرسال البيانات. يرجى المحاولة لاحقًا.",
  },
  en: {
    required: "This field is required",
    minLength: (min: number) => `Minimum length is ${min} characters`,
    maxLength: (max: number) => `Maximum length is ${max} characters`,
    minValue: (min: number) => `Value must be ≥ ${min}`,
    maxValue: (max: number) => `Value must be ≤ ${max}`,
    pattern: "Value does not match the required pattern",
    submitFailed: "Failed to submit. Please try again later.",
  },
};
