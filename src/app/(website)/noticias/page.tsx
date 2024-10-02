import News from "@/components/website/blog/news";
import { PostsService } from "@/services/posts";

export default async function Noticias() {
  const posts = await PostsService.listAll(10, 1);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <News data={posts} />
    </main>
  )
}
