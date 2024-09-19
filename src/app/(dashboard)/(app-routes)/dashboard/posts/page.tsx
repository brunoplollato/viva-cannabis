import { Posts } from "@/components/posts";
import { PostsService } from "@/services/posts";

const posts = async () => {
  const posts = await PostsService.listAll();
  return <Posts data={posts} />;
};

export default posts;
