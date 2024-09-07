import { PasswordReset } from "@/components/auth/password-reset";
import { AuthService } from "@/services/auth";

const changePassword = async ({ params: token }: {
  params: { token: string }
}) => {
  const res = await AuthService.validateToken(token.token);
  if (res.error) {
    return (
      <>
        <p className='text-center text-[25px] font-bold mb-6'>{res.message}</p>
      </>
    )
  }
  return <PasswordReset token={token.token} />;
};

export default changePassword;