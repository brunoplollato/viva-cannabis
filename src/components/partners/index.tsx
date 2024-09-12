"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { PartnersService } from "@/services/partners";
import { Input } from '@nextui-org/react';
import { put } from '@vercel/blob';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEventHandler, useCallback, useState } from "react";
import { TableWrapper } from "../table/table";
import { Add } from "./add";
import { columns } from "./data";
import { Delete } from "./delete";
import { Edit } from "./edit";

type PartnerProps = {
  name: string;
  occupation: string;
  photo: string;
}

export const Partners = ({ data }: { data: PartnerProps[] }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [partners, setPartners] = useState(data)

  const fetchPartners = useCallback(async () => {
    const res: PartnerProps[] = await PartnersService.listAll()
    setPartners(res)
  }, [])

  const handleAdd = useCallback(async (values: PartnerProps, file: File) => {
    const res = await PartnersService.create(values, file)
    if (!res.error) fetchPartners()
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    const res = await PartnersService.delete(id);
    if (!res.error) fetchPartners()
  }, [])

  const handleEdit = useCallback(async (values: PartnerProps, id: string) => {
    const res = await PartnersService.update(values, id)
    if (!res.error) fetchPartners()
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTimeout(() => {
      if (e.target.value.length >= 3) {
        const filteredPartners = data.filter(
          item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.occupation.includes(e.target.value)
        )
        setPartners(filteredPartners)
      } else if (e.target.value.length === 0) {
        setPartners(data)
      }
    }, 2000);
  }, []);

  const renderCell = useCallback((partner: any, columnKey: string) => {
    // @ts-ignore
    const cellValue = partner[columnKey];
    switch (columnKey) {
      case "name":
        return (
          partner.name
        );
      case "occupation":
        return (
          partner.occupation
        );
      case "actions":
        return (
          <div className="flex items-center gap-4 ">
            <div>
              <Edit
                title="Editar Parceiro"
                partner={partner}
                submit={handleEdit}
              />
            </div>
            <div>
              <Delete
                title="Deletar Parceiro"
                description="Você está prestes a deletar um parceiro"
                submit={() => handleDelete(partner.id)}
              />
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, [])

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
            placeholder="Procurar Parceiro"
          />
        </div>
        {(user && user.role) === 'ADMIN' && (
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Add
              title="Adicionar Parceiro"
              submit={handleAdd}
            />
          </div>
        )}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper data={partners} columns={columns} renderCell={renderCell} />
      </div>
    </div>
  );
};
