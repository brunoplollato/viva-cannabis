export const dynamic = 'force-static'
import prisma from "@/lib/prisma";
import { parseJwt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { body } = await request.json();
  const {token} = body;
  if (!token) { 
    return NextResponse.json({message: 'Token é obrigatório'}, { status: 500})
  }
  const parsedToken = parseJwt(token);
  const {id, exp} = parsedToken
  try {
    const user = await prisma.users.findUnique({
      where: {
        id
      }
    })
    if (user?.password_reset_token !== token) {
      return NextResponse.json({message: 'Token inválido'}, { status: 403});
    }
    if (Date.now() >= exp * 1000) {
      return NextResponse.json({message: 'Token expirado'}, { status: 403});
    }
    return NextResponse.json({ message: 'Token valido' }, {status: 200});
  } catch (error) {
    throw new Error(error as any)
  }
}