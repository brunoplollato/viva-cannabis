import { UserProps } from "@/types/DTO";
import { clsx, type ClassValue } from "clsx";
import { SHA256 } from "crypto-js";
import jwt from "jsonwebtoken";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashPassword(value: string) {
  return SHA256(value).toString();
};

export function generateJWT(user: UserProps) {
  const secret = process.env.NEXT_JWT_SECRET_KEY
  const token = jwt.sign({...user, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, secret as string)
  return token
}

export function parseJwt (token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export function evaluatePasswordStrength(password: string) {
  let score = 0;

  if (!password) return '';

  // Check password length
  if (password.length > 8) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
    return { strength: "Weak", score};
  case 3:
    return { strength: "Medium", score};
  case 4:
  case 5:
    return { strength: "Strong", score};
  }
}