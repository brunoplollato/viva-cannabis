import { Posts } from "@/components/posts";
import { PostsService } from "@/services/posts";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Posts'
  }
}
const posts = async () => {
  const posts = await PostsService.listAll(100, 1);
  return <Posts data={posts} />;
};

export default posts;
