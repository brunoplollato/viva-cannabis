import { PostProps } from '@/types/DTO';
import { PostsService } from '../../services/posts/index';
import PostCards from './blog/postCards';
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "./section";

export default async function Blog() {
  const posts = await PostsService.listAll(3, 1);
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