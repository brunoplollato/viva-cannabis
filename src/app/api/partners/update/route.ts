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
    const partner = await prisma.partners.findUnique({
      where: {
        id: body.id,
      }
    })

    if (!partner) {
      return NextResponse.json({message: 'Parceiro não existe!'}, {status: 403})
    }

    const data = {
      ...partner,
      ...body,
      updated_at: new Date().toISOString(),
    }

    const newPartner = await prisma.partners.update({
      where: {
        id: body.id,
      },
      data,
    })
    return NextResponse.json({message: 'Parceiro atualizado com sucesso!', data: newPartner}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}