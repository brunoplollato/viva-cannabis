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
    const service = await prisma.services.delete({
      where: {
        id: id,
      }
    })

    if (!service) {
      return NextResponse.json({message: 'Serviço não existe!'}, {status: 403})
    }
    return NextResponse.json({message: 'Serviço deletado com sucesso!', data: service}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}