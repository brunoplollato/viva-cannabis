import EditPost from "@/components/posts/edit";
import { PostsService } from "@/services/posts";

type Props = {
  params: {
    slug: string
  }
}

const editPost = async ({ params: { slug } }: Props) => {
  const data = await PostsService.getBySlug(slug);
  return <EditPost data={data} />;
};

export default editPost;
