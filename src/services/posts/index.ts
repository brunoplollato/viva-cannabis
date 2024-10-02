import { del, get, post, put } from "@/lib/api";
import { PostProps } from "@/types/DTO";
import { toast } from "react-toastify";

type PostResponse = {
  error?: boolean,
  message: string,
  data: PostProps[],
  statusCode?: number,
}

export class PostsService {
  static async listAll(pageSize: number, page: number): Promise<any> {
    const res: PostResponse = await get(`/posts?pageSize=${pageSize}&page=${page}`);
    return res
  }
  static async getBySlug(slug: string) {
    const res: PostProps = await get(`/posts/${slug}`);
    return res
  }
  static async create(data: PostProps): Promise<PostResponse> {
    const loading = toast.loading('Carregando')
    const res: PostResponse = await post('/posts/create', {
      body: data
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
  static async update(data: PostProps, id: string): Promise<PostResponse> {
    const loading = toast.loading('Carregando')
    const res: PostResponse = await put(`/posts/update`, {
      body: {
        ...data,
        id
      }
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
  static async delete(id: string): Promise<PostResponse> {
    const loading = toast.loading('Carregando')
    const res: PostResponse = await del(`/posts/delete?id=${id}`)
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
}