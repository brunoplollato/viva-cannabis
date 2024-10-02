import EditPost from "@/components/posts/edit";
import { CategoriesService } from '@/services/categories';
import { PostsService } from "@/services/posts";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Editar Post'
  }
}

const editPost = async ({ params: { slug } }: Props) => {
  const data = await PostsService.getBySlug(slug);
  const categories = await CategoriesService.listAll()
  return <EditPost data={data} categories={categories as any} />;
};

export default editPost;
