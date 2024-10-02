'use client'

import { PostProps } from "@/types/DTO";
import { useState } from "react";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "../section";
import PostCards from "./postCards";

export default function News({ data }: { data: PostProps[] }) {
  const [posts, setPosts] = useState(data);
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          Notícias
        </SectionTitle>
        <SectionDescription>
          Últimas notícias sobre Cannabis Medicinal no Mundo.
        </SectionDescription>
      </SectionHeader>
      <SectionContent className='gap-3 flex-row justify-between items-stretch mt-20'>
        {posts.map((post: PostProps) => (
          <PostCards key={post.id} title={post.title} slug={post.slug} image={post.image} description={post.content} category={post.category?.title || ''} created_at={post.created_at || new Date()} />
        ))}
      </SectionContent>
    </Section>
  )
}
