import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextAuthOptions from "../../auth/[...nextauth]/options";

export async function DELETE(request: NextRequest) {
  const id = await request.nextUrl.searchParams.get('id');
  const session = await getServerSession(nextAuthOptions)
  if (!session) { 
      return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  }
  if (session.user && session.user.role !== 'ADMIN') {
      return NextResponse.json({message: 'Usuário não tem permissão!'}, {status: 401})
  }
  if (!id) { 
    return NextResponse.json({message: 'Id é obrigatório!'}, {status: 500})
  }
  try {
    const card = await prisma.aboutCards.delete({
      where: {
        id: id,
      }
    })

    if (!card) {
      return NextResponse.json({message: 'Card não existe!'}, {status: 403})
    }
    return NextResponse.json({message: 'Card deletado com sucesso!', data: card}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}