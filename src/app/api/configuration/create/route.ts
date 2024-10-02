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
    const config = await prisma.configuration.create({
      data: {
        title: body.title,
        description: body.description,
        tags: body.tags,
        created_by: session.user.username,
        social_medias: body.social_medias,
        phone: body.phone,
        email: body.email
      },
    })
    return NextResponse.json({message: 'Configuração criada com sucesso!', data: config}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}