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
    const user = await prisma.users.delete({
      where: {
        id: id,
      }
    })

    if (!user) {
      return NextResponse.json({message: 'Usuário não existe!'}, {status: 403})
    }

    if (user.role === 'ADMIN') { 
      return NextResponse.json({message: 'Usuário não pode ser deletado!'}, {status: 401})
    }

    const data: any = user
    delete data.password
    return NextResponse.json({message: 'Usuário deletado com sucesso!', data}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}