import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextAuthOptions from "../../auth/[...nextauth]/options";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) { 
      return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  }
  const { body } = await request.json();
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: body.id,
      }
    })

    if (!category) {
      return NextResponse.json({message: 'Categoria não existe!'}, {status: 403})
    }

    const data = {
      ...category,
      ...body,
      updated_at: new Date().toISOString(),
    }

    const newCategory = await prisma.categories.update({
      where: {
        id: body.id,
      },
      data,
    })
    return NextResponse.json({message: 'Categoria atualizada com sucesso!', data: newCategory}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}