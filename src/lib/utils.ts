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