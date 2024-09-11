import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const email = await request.nextUrl.searchParams.get("email");
  const password = await request.nextUrl.searchParams.get("password");
  if (!email || !password) {
    return NextResponse.json({message: 'Email e Password são obrigatórios'}, {status: 400})
  }
  try {
    const user = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      created_at: true,
      updated_at: true,
      password: true,
      role: true
    }
    })
    if (user && user.password === hashPassword(password)) {
    const data: any = user
    delete data.password
    return NextResponse.json({message: 'Login realizado com sucesso!', data}, {status: 200});
  } else {
    return NextResponse.json({ message: 'Credenciais inválidas!' }, { status: 401 })
    }
  } catch (error: any) {
    throw new Error(error)
  }
  
}