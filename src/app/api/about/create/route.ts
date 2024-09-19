import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextAuthOptions from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) { 
      return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  }
  if (session.user && session.user.role !== 'ADMIN') {
      return NextResponse.json({message: 'Usuário não tem permissão!'}, {status: 401})
  }
  const {body} = await request.json();
  try {
    const aboutCard = await prisma.aboutCards.findUnique({
      where: {
        title: body.title,
      }
    })

    if (aboutCard) {
      return NextResponse.json({message: 'Já existe um card com esse título!'}, {status: 403})
    }

    const newCard = await prisma.aboutCards.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
      },
    })
    return NextResponse.json({message: 'Card criado com sucesso!', data: newCard}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}