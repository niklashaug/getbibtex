import { getCurrentDateString } from "@/utils/date-format";

export function encodeCharactersInBibTex(str: string): string {
  return str
    .replace(/([A-Z])/g, "{$1}")
    .replace(/&/g, "\\&")
    .replace(/\$/g, "\\$")
    .replace(/\_/g, "\\_");
}

export function createAccessedNote() {
  const currentDate = getCurrentDateString();
  return `Zugriff am {${currentDate}}`;
}
