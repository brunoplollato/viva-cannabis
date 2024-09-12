import { del, get, post, put } from "@/lib/api";
import { PartnerProps } from "@/types/DTO";
import { put as update } from '@vercel/blob';
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
  static async create(data: PartnerProps, file: File) {
    const today = new Date().toISOString();
    const formData = await new FormData();
    formData.append('photo', file, `${data.name}-${today}`);
    const imageFile = formData.get('photo') as File;
    const blob = await update(`partners/${imageFile.name}`, imageFile, {
      access: 'public',
    })
    const res: CreateResponse = await post('/partners/create', {
      body: data
    })
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async update(data: PartnerProps, id: string) {
    const res: CreateResponse = await put(`/partners/update`, {
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
    const res: CreateResponse = await del(`/partners/delete?id=${id}`)
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
}