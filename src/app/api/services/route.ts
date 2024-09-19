export const dynamic = 'force-static'
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.services.findMany()
    return NextResponse.json(res);
  } catch (error) {
    throw new Error(error as any)
  }
}