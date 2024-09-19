import { del, get, post, put } from "@/lib/api";
import { PostProps } from "@/types/DTO";
import { toast } from "react-toastify";

type CreateResponse = {
  error?: boolean,
  message: string,
  data: PostProps
  statusCode?: number,
}

export class PostsService {
  static async listAll() {
    const res: PostProps[] = await get('/posts');
    return res
  }
  static async getBySlug(slug: string) {
    const res: PostProps = await get(`/posts/${slug}`);
    return res
  }
  static async create(data: PostProps) {
    const res: CreateResponse = await post('/posts/create', {
      body: data
    })
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async update(data: PostProps, id: string) {
    const res: CreateResponse = await put(`/posts/update`, {
      body: {
        ...data,
        id
      }
    })
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async delete(id: string) {
    const res: CreateResponse = await del(`/posts/delete?id=${id}`)
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
}