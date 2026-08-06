import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely converts price strings containing Arabic or Western numerals (e.g. "٣٥٠ ج.م", "1,200 EGP") to a number.
 */
export function parsePriceToNumber(price: string | number | null | undefined): number {
  if (price === null || price === undefined) return 0;
  if (typeof price === "number") return isNaN(price) ? 0 : price;

  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  let normalized = String(price);
  for (let i = 0; i < 10; i++) {
    normalized = normalized.replaceAll(arabicDigits[i], String(i));
  }
  const digitsOnly = normalized.replace(/[^0-9]/g, "");
  return parseInt(digitsOnly, 10) || 0;
}
