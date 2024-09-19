import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextAuthOptions from "../../auth/[...nextauth]/options";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) { 
      return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  }
  if (session.user && session.user.role !== 'ADMIN') {
      return NextResponse.json({message: 'Usuário não tem permissão!'}, {status: 401})
  }
  const { body } = await request.json();
  try {
    const card = await prisma.aboutCards.findUnique({
      where: {
        id: body.id,
      }
    })

    if (!card) {
      return NextResponse.json({message: 'Card não existe!'}, {status: 403})
    }

    const data = {
      ...card,
      ...body,
      updated_at: new Date().toISOString(),
    }

    const newData = await prisma.aboutCards.update({
      where: {
        id: body.id,
      },
      data,
    })
    return NextResponse.json({message: 'Card atualizado com sucesso!', data: newData}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}