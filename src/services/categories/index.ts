import { del, get, post, put } from "@/lib/api";
import { CategoryProps } from "@/types/DTO";
import { toast } from "react-toastify";

type Response = {
  error?: boolean,
  message: string,
  data: CategoryProps[],
  statusCode?: number,
}

export class CategoriesService {
  static async listAll() {
    const res: Response  = await get('/categories');
    return res
  }
  static async create(data: CategoryProps) {
    const loading = toast.loading('Carregando')
    const res: Response = await post('/categories/create', {
      body: data
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
  static async update(data: CategoryProps, id: string) {
    const loading = toast.loading('Carregando')
    const res: Response = await put(`/categories/update`, {
      body: {
        ...data,
        id
      }
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
  static async delete(id: string) {
    const loading = toast.loading('Carregando')
    const res: Response = await del(`/categories/delete?id=${id}`)
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
}