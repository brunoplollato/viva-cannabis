"use client";
import { AboutService } from "@/services/about";
import { AboutProps } from "@/types/DTO";
import { Input } from '@nextui-org/react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEventHandler, useCallback, useState } from "react";
import { TableWrapper } from "../table/table";
import HeroIcon from "../website/heroIcon";
import { Add } from "./add";
import { columns } from "./data";
import { Delete } from "./delete";
import { Edit } from "./edit";

export const AboutCards = ({ data }: { data: AboutProps[] }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [services, setAboutCards] = useState(data)

  const fetchAboutCards = useCallback(async () => {
    const res: AboutProps[] = await AboutService.listAll()
    setAboutCards(res)
  }, [])

  const handleAdd = useCallback(async (values: AboutProps) => {
    const res = await AboutService.create(values)
    if (!res.error)
      fetchAboutCards()
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    const res = await AboutService.delete(id);
    if (!res.error) fetchAboutCards()
  }, [])

  const handleEdit = useCallback(async (values: AboutProps, id: string) => {
    const res = await AboutService.update(values, id)
    if (!res.error)
      fetchAboutCards()
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTimeout(() => {
      if (e.target.value.length >= 3) {
        const filteredAboutCards = data.filter(
          item => item.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setAboutCards(filteredAboutCards)
      } else if (e.target.value.length === 0) {
        setAboutCards(data)
      }
    }, 2000);
  }, []);

  const renderCell = useCallback((service: any, columnKey: string) => {
    // @ts-ignore
    const cellValue = service[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <div className="flex items-center gap-3">
            {service.icon && (
              <HeroIcon name={service.icon} type="outline" />
            )}
            <p>{service.title}</p>
          </div>
        );
      case "description":
        return (
          service.description
        );
      case "actions":
        return (
          <div className="flex items-center gap-4 ">
            <div>
              <Edit
                title="Editar Card Sobre"
                service={service}
                submit={handleEdit}
              />
            </div>
            <div>
              <Delete
                title="Deletar Card Sobre"
                description="Você está prestes a deletar um card"
                submit={() => handleDelete(service.id)}
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
          <Link href={"/dashboard"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span> </span>
          <span> Cards Sobre</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Cards Sobre</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            onChange={onChange}
            placeholder="Procurar Card"
          />
        </div>
        {(user && user.role) === 'ADMIN' && (
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Add
              title="Adicionar Card Sobre"
              submit={handleAdd}
            />
          </div>
        )}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper data={services} columns={columns} renderCell={renderCell} />
      </div>
    </div>
  );
};
