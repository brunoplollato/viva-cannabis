import { get, post, put } from "@/lib/api";
import { toast } from "react-toastify";

type Response = {
  error?: boolean,
  message: string,
  statusCode?: number,
}

export class AuthService {
  static async login(email: string, password: string): Promise<any>{
    const res: Response = await get(`/login?email=${email}&password=${password}`);
    return res
  }
  static async verify(token: string) {
    const res: Response = await post(`/verify`, {
      body: {
        token
      }
    });
    return res
  }
  static async resendVerificationEmail(userId: string): Promise<Response> {
    const res: Response = await get(`/verify/new/?userId=${userId}`);
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async recovery(email: string): Promise<Response> {
    const res: Response = await post(`/recovery`, {
      body: {
        email
      }
    });
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async validateToken(token: string): Promise<Response> {
    const res: Response = await post(`/validate-token`, {
      body: {
        token
      }
    });
    return res
  }
  static async redefinePassword(token: string, password: string, confirmPassword: string): Promise<Response> {
    const res: Response = await put(`/users/redefine-password`, {
      body: {
        token,
        password,
        confirmPassword,
        reset_password_token: ''
      }
    });
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
}