import { del, get, post, put } from "@/lib/api";
import { PartnerProps } from "@/types/DTO";
import { toast } from "react-toastify";


type CreateResponse = {
  error?: boolean,
  message: string,
  data: PartnerProps,
  statusCode?: number,
}

export class PartnersService {
  static async listAll() {
    const res: PartnerProps[] = await get('/partners');
    return res
  }
  static async create(data: PartnerProps) {
    const loading = toast.loading('Carregando')
    const res: CreateResponse = await post('/partners/create', {
      body: data
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
  static async update(data: PartnerProps, id: string) {
    const loading = toast.loading('Carregando')
    const res: CreateResponse = await put(`/partners/update`, {
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
    const res: CreateResponse = await del(`/partners/delete?id=${id}`)
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
}