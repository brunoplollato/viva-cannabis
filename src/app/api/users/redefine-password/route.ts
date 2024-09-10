import prisma from "@/lib/prisma";
import { hashPassword, parseJwt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { body } = await request.json();
  const parsedToken = parseJwt(body.token)
  const {id} = parsedToken
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      }
    })

    if (!user) {
      return NextResponse.json({message: 'Usuário não existe!'}, {status: 403})
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json({message: 'Ambos as senhas precisam se iguais!'}, {status: 403})
    }

    const hashedPassword = hashPassword(body.password)

    const data = {
      ...user,
      password: hashedPassword,
      updated_at: new Date().toISOString(),
    }

    const newUser = await prisma.users.update({
      where: {
        id: parsedToken.id,
      },
      data,
    })

    const newData: any = newUser
    delete newData.password
    return NextResponse.json({message: 'Senha redefinida com sucesso!', newData}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}