import NewPost from "@/components/posts/new";
import { CategoriesService } from '@/services/categories';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Novo Post'
  }
}

const newPost = async () => {
  const categories = await CategoriesService.listAll()
  return <NewPost categories={categories as any} />;
};

export default newPost;
