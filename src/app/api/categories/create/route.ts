import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextAuthOptions from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) { 
      return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  }
  const {body} = await request.json();
  try {
    const category = await prisma.categories.findUnique({
      where: {
        title: body.title,
      }
    })

    if (category) {
      return NextResponse.json({message: 'Já existe uma categoria com esse nome!'}, {status: 403})
    }

    const newCategory = await prisma.categories.create({
      data: {
        title: body.title,
        description: body.description,
      },
    })
    return NextResponse.json({message: 'Categoria criada com sucesso!', data: newCategory}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}