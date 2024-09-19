import { del, get, post, put } from "@/lib/api";
import { AboutProps } from "@/types/DTO";
import { toast } from "react-toastify";

type CreateResponse = {
  error?: boolean,
  message: string,
  data: AboutProps[]
  statusCode?: number,
}

export class AboutService {
  static async listAll() {
    const res: AboutProps[] = await get('/about');
    return res
  }
  static async create(data: AboutProps) {
    const res: CreateResponse = await post('/about/create', {
      body: data
    })
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async update(data: AboutProps, id: string) {
    const res: CreateResponse = await put(`/about/update`, {
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
    const res: CreateResponse = await del(`/about/delete?id=${id}`)
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
}