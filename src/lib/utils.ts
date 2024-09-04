import { clsx, type ClassValue } from "clsx";
import { SHA256 } from "crypto-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashPassword(value: string) {
  return SHA256(value).toString();
};