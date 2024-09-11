import AccountValidation from '@/components/emailTemplates/account-validation';
import prisma from "@/lib/prisma";
import { generateJWT, hashPassword } from "@/lib/utils";
import { UserProps } from '@/types/DTO';
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
  const randPassword = new Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&()?-+").map(x => ((chars) => { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(x)).join('');
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

    const userData: any = newUser
    delete userData.password
    delete userData.verification_token
    delete userData.password_reset_token

    const token = generateJWT(userData as UserProps)

    await resend.emails.send({
      from: 'VivaCannabis <onboarding@resend.dev>',
      to: body.email,
      subject: 'Verificação de conta <VivaCannabis>',
      react: AccountValidation({ username: body.username, password: randPassword, token}),
    });

    await prisma.users.update({
      where: {
        id: newUser.id,
      },
      data: {
        verification_token: token,
      }
    })
    return NextResponse.json({message: 'Usuário criado com sucesso!', user: userData}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}