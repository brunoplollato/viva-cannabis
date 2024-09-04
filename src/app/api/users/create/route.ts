import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextAuthOptions from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) { 
      return NextResponse.json({message: 'Usuário não está logado!'}, {status: 401})
  }
  if (session.user && session.user.role !== 'ADMIN') {
      return NextResponse.json({message: 'Usuário não tem permissão!'}, {status: 401})
  }
  const {body} = await request.json();
  var randPassword = new Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(x)).join('');
  console.log("🚀 ~ POST ~ randPassword:", randPassword)
  const hashedPassword = hashPassword(randPassword)
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: body.email,
      }
    })

    if (user) {
      return NextResponse.json({message: 'Já existe um usuário com esse email!'}, {status: 403})
    }

    const newUser = await prisma.users.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPassword,
        phone: body.phone,
        role: body.role
      },
    })

    const data: any = newUser
    delete data.password
    return NextResponse.json({message: 'Usuário criado com sucesso!', data}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}