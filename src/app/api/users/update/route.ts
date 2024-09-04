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
    const user = await prisma.users.findUnique({
      where: {
        id: body.id,
      }
    })

    if (!user) {
      return NextResponse.json({message: 'Usuário não existe!'}, {status: 403})
    }

    const data = {
      ...user,
      ...body,
      updated_at: new Date().toISOString(),
    }

    const newUser = await prisma.users.update({
      where: {
        id: body.id,
      },
      data,
    })

    const newData: any = newUser
    delete newData.password
    return NextResponse.json({message: 'Usuário atualizado com sucesso!', newData}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}