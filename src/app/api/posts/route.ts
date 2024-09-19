export const dynamic = 'force-static'
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = await req.nextUrl.searchParams.get('page')
  try {
    const res = await prisma.posts.findMany({
      take: 10,
      orderBy: [
        {
          created_at: 'desc'
        }
      ],
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
    let lastPostResult = res[res.length - 1];
    let myCursor = lastPostResult.id;
    if (page) {
      const res = await prisma.posts.findMany({
        take: 10,
        skip: Number(page) - 1,
        cursor: {
          id: myCursor
        },
        orderBy: [
          {
            created_at: 'desc'
          }
        ],
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
      lastPostResult = res[res.length - 1];
      myCursor = lastPostResult.id;
      return NextResponse.json(res);
    }
    return NextResponse.json(res);
  } catch (error) {
    throw new Error(error as any)
  }
}