'use client'

import { PostProps } from "@/types/DTO";
import { BreadcrumbItem, Breadcrumbs, Chip, Image } from "@nextui-org/react";
import draftToHtml from 'draftjs-to-html';
import { Section, SectionContent, SectionHeader, SectionSubtitle, SectionTitle } from "../section";

export default function PostDetail({ post }: { post: PostProps }) {
  const content = JSON.parse(post.content);
  return (
    <Section>
      <Breadcrumbs className="container my-10">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/noticias">Notícias</BreadcrumbItem>
        <BreadcrumbItem>Detalhes</BreadcrumbItem>
      </Breadcrumbs>
      <SectionHeader className="container">
        <Image
          // as={NextImage}
          alt={post.title}
          className="object-cover rounded-xl"
          src={post.image}
          width={1800}
        />
        <SectionTitle className="text-left text-6xl">
          {post.title}
        </SectionTitle>
        <SectionSubtitle className=" text-left text-xs w-full">
          <strong>{post.category?.title}</strong> - {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
        </SectionSubtitle>
      </SectionHeader>
      <SectionContent className='gap-3 justify-between items-start mt-20'>
        <div className="pb-10" dangerouslySetInnerHTML={{ __html: draftToHtml(content) }} />
        <div className="flex gap-3 justify-start flex-wrap pt-10 border-t-1">
          {post.tags.map(tag => (
            <Chip
              key={tag}
              variant="bordered"
              className="rounded-none"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </SectionContent>
    </Section>
  )
}
