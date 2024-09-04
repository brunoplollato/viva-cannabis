import { Users } from "@/components/users";
import { UserService } from "@/services/users";

const users = async () => {
  const users: any[] = await UserService.listAll();
  return <Users data={users} />;
};

export default users;
