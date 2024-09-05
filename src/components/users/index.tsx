"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { UserService } from "@/services/users";
import { UserProps } from "@/types/DTO";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEventHandler, useCallback, useState } from "react";
import { TableWrapper } from "../table/table";
import { AddUser } from "./add-user";

export const Users = ({ data }: { data: UserProps[] }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [users, setUsers] = useState(data)

  const fetchUsers = useCallback(async () => {
    const res: UserProps[] = await UserService.listAll()
    setUsers(res)
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTimeout(() => {
      if (e.target.value.length >= 3) {
        const filteredUsers = data.filter(item => item.username.includes(e.target.value) || item.email.includes(e.target.value) || item.phone.includes(e.target.value) || item.role.toLowerCase().includes(e.target.value.toLowerCase()))
        setUsers(filteredUsers)
      } else if (e.target.value.length === 0) {
        setUsers(data)
      }
    }, 2000);
  }, []);

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Usuários</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Usuários</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            onChange={onChange}
            placeholder="Procurar usuários"
          />
        </div>
        {(user && user.role) === 'ADMIN' && (
          <div className="flex flex-row gap-3.5 flex-wrap">
            <AddUser update={fetchUsers} />
          </div>
        )}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper data={users} />
      </div>
    </div>
  );
};
