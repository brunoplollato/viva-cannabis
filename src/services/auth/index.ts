import { get, post } from "@/lib/api";
import { toast } from "react-toastify";

type Response = {
  error?: boolean,
  message: string,
  statusCode?: number,
}

export class AuthService {
  static async verify(token: string) {
    const res: Response = await post(`/verify`, {
      body: {
        token
      }
    });
    return res
  }
  static async resendVerificationEmail(userId: string) {
    const res: Response = await get(`/verify/new/?userId=${userId}`);
    if (res.error) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    return res
  }
  static async recovery(email: string) {
    const res: Response = await post(`/recovery`, {
      body: {
        email
      }
    });
    return res
  }
  static async validateToken(token: string) {
    const res: Response = await post(`/validate-token`, {
      body: {
        token
      }
    });
    return res
  }
}