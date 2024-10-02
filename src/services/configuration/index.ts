import { get, post } from "@/lib/api";
import { ConfigurationProps } from "@/types/DTO";
import { toast } from "react-toastify";

type Response = {
  error?: boolean,
  message: string,
  data: ConfigurationProps[],
  statusCode?: number,
}

export class ConfigurationService {
  static async listAll() {
    const res: Response  = await get('/configuration');
    return res
  }
  static async create(data: ConfigurationProps) {
    const loading = toast.loading('Carregando')
    const res: Response = await post('/configuration/create', {
      body: data
    })
    toast.update(loading, {render: res.message, type: res.error ? 'error' : 'success', isLoading: false})
    return res
  }
}