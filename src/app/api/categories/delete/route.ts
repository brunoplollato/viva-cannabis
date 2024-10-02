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
  if (!id) { 
    return NextResponse.json({message: 'Id é obrigatório!'}, {status: 500})
  }
  try {
    const data = await prisma.categories.delete({
      where: {
        id: id,
      }
    })

    if (!data) {
      return NextResponse.json({message: 'Categoria não existe!'}, {status: 403})
    }
    return NextResponse.json({message: 'Categoria deletada com sucesso!', data}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}