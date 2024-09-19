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
    const res: CreateResponse = await post('/services/create', {
      body: data
    })
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async update(data: ServiceProps, id: string) {
    const res: CreateResponse = await put(`/services/update`, {
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
    const res: CreateResponse = await del(`/services/delete?id=${id}`)
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
}