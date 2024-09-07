export const dynamic = 'force-static'
import PasswordRecovery from "@/components/emailTemplates/password-recovery";
import prisma from "@/lib/prisma";
import { generateJWT } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { body } = await request.json();
  const {email} = body;
  if (!email) { 
    return NextResponse.json({message: 'Email é obrigatório'}, { status: 500})
  }
  const user = await prisma.users.findUnique({
    where: {
      email
    }
  })
  if (!user) {
    return NextResponse.json({message: 'Email inválido'}, { status: 403});
  }

  const userData: any = user
  delete userData.password
  delete userData.verification_token
  delete userData.password_reset_token
  const password_reset_token = generateJWT(userData, )
  try {
    const { data } = await resend.emails.send({
      from: 'VivaCannabis <onboarding@resend.dev>',
      to: body.email,
      subject: 'Redefinição de senha',
      react: PasswordRecovery({ username: user.username, token: password_reset_token}),
    });
    if (data) {
      await prisma.users.update({
        where: {
          email
        },
        data: {
          password_reset_token
        }
      })
      return NextResponse.json({ message: 'Email enviado com sucesso' }, {status: 200});
    }
  } catch (error) {
    throw new Error(error as any)
  }
}