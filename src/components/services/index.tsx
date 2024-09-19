"use client";
import { ServicesService } from "@/services/services";
import { ServiceProps } from "@/types/DTO";
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

export const Services = ({ data }: { data: ServiceProps[] }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [services, setServices] = useState(data)

  const fetchServices = useCallback(async () => {
    const res: ServiceProps[] = await ServicesService.listAll()
    setServices(res)
  }, [])

  const handleAdd = useCallback(async (values: ServiceProps) => {
    const res = await ServicesService.create(values)
    if (!res.error)
      fetchServices()
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    const res = await ServicesService.delete(id);
    if (!res.error) fetchServices()
  }, [])

  const handleEdit = useCallback(async (values: ServiceProps, id: string) => {
    const res = await ServicesService.update(values, id)
    if (!res.error)
      fetchServices()
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTimeout(() => {
      if (e.target.value.length >= 3) {
        const filteredServices = data.filter(
          item => item.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setServices(filteredServices)
      } else if (e.target.value.length === 0) {
        setServices(data)
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
                title="Editar Serviço"
                service={service}
                submit={handleEdit}
              />
            </div>
            <div>
              <Delete
                title="Deletar Serviço"
                description="Você está prestes a deletar um serviço"
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
          <span> Serviços</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Serviços</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            onChange={onChange}
            placeholder="Procurar Serviço"
          />
        </div>
        {(user && user.role) === 'ADMIN' && (
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Add
              title="Adicionar Serviço"
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
