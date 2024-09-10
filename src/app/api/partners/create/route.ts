import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import nextAuthOptions from "../../auth/[...nextauth]/options";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const partner = await prisma.partners.findUnique({
      where: {
        name: body.name,
      }
    })

    if (partner) {
      return NextResponse.json({message: 'Já existe um parceiro com esse nome!'}, {status: 403})
    }

    const newPartner = await prisma.partners.create({
      data: {
        name: body.name,
        occupation: body.occupation,
        photo: body.photo,
      },
    })
    return NextResponse.json({message: 'Parceiro criado com sucesso!', data: newPartner}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}