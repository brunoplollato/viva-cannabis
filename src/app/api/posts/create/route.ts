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
    const post = await prisma.posts.findMany({
      where: {
        OR: [
          {
            title: {
              equals: body.title,
            },
          },
          {
            slug: {
              equals: body.slug,
            }
          },
        ],
      }
    })

    if (post) {
      return NextResponse.json({message: 'Já existe um post com esse título!'}, {status: 403})
    }

    const newPost = await prisma.posts.create({
      data: {
        image: body.image,
        title: body.title,
        content: body.content,
        published: body.published,
        userId: session.user.id,
        categoryId: body.categoryId,
        tags: body.tags,
        slug: body.slug
      },
    })
    return NextResponse.json({message: 'Post criado com sucesso!', data: newPost}, {status: 200});
  } catch (error: any) {
    throw new Error(error)
  }
}