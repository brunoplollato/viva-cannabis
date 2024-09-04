import { del, get, post, put } from "@/lib/api";
import { UserProps } from "@/types/DTO";
import { toast } from "react-toastify";

type CreateResponse = {
  error?: boolean,
  message: string,
  data: UserProps
  statusCode?: number,
}

export class UserService {
  static async listAll() {
    const res: UserProps[] = await get('/users');
    return res
  }
  static async create(data: UserProps) {
    const res: CreateResponse = await post('/users/create', {
      body: data
    })
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async update(data: UserProps, id: string) {
    const res: CreateResponse = await put(`/users/update`, {
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
    const res: CreateResponse = await del(`/users/delete?id=${id}`)
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
}