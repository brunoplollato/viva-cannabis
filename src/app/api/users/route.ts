export const dynamic = 'force-static'
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await getServerSession(nextAuthOptions)
  // if (!session) { 
  //     return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  // }
  // if (session.user && session.user.role !== 'ADMIN') {
  //     return NextResponse.json({message: 'Usuário não tem permissão!'}, {status: 401})
  // }
  try {
    const res = await prisma.users.findMany()
    return NextResponse.json(res);
  } catch (error) {
    throw new Error(error as any)
  }
}