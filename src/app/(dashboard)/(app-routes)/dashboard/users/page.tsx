import { Users } from "@/components/users";
import { UserService } from "@/services/users";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Usuários'
  }
}

const users = async () => {
  const users: any[] = await UserService.listAll();
  return <Users data={users} />;
};

export default users;
