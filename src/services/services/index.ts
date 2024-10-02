import { del, get, post, put } from "@/lib/api";
import { ServiceProps } from "@/types/DTO";
import { toast } from "react-toastify";

type CreateResponse = {
  error?: boolean,
  message: string,
  data: ServiceProps
  statusCode?: number,
}

export class ServicesService {
  static async listAll() {
    const res: ServiceProps[] = await get('/services');
    return res
  }
  static async create(data: ServiceProps) {
    const loading = toast.loading('Carregando')
    const res: CreateResponse = await post('/services/create', {
      body: data
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
  static async update(data: ServiceProps, id: string) {
    const loading = toast.loading('Carregando')
    const res: CreateResponse = await put(`/services/update`, {
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
    const res: CreateResponse = await del(`/services/delete?id=${id}`)
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
}