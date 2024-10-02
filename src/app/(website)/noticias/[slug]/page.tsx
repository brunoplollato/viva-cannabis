import Loading from "@/components/loading";
import PostDetail from "@/components/website/blog/postDetail";
import { PostsService } from "@/services/posts";
import { Suspense } from "react";

export default async function Post({ params: { slug } }: { params: { slug: string } }) {
  const post = await PostsService.getBySlug(slug);
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex min-h-screen flex-col items-center">
        <PostDetail post={post} />
      </main>
    </Suspense>
  )
}
