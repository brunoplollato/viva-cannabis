export const dynamic = 'force-static'
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params: {slug} }: Props) {
  try {
    const res = await prisma.posts.findUnique({
      where: {slug},
      include: {
        author: {
          select: {
            username: true,
          },
        },
        category: {
          select: {
            title: true,
          },
        },
      },
    })
    return NextResponse.json(res);
  } catch (error) {
    throw new Error(error as any)
  }
}