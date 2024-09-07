import { AccountVerify } from "@/components/auth/accountVerify";

const Verify = ({
  params: token,
}: {
  params: { token: string };
}) => {
  return <AccountVerify token={token.token} />;
};

export default Verify;
