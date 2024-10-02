"use client";
import { CategoriesService } from "@/services/categories";
import { Input } from '@nextui-org/react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEventHandler, useCallback, useState } from "react";
import { TableWrapper } from "../table/table";
import { Add } from "./add";
import { columns } from "./data";
import { Delete } from "./delete";
import { Edit } from "./edit";

type CategoryProps = {
  title: string;
  description: string;
}

export const Categories = ({ data }: { data: CategoryProps[] }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [categories, setCategories] = useState(data)

  const fetchCategories = useCallback(async () => {
    const res: any = await CategoriesService.listAll()
    setCategories(res)
  }, [])

  const handleAdd = useCallback(async (values: CategoryProps) => {
    const res = await CategoriesService.create(values)
    if (!res.error)
      fetchCategories()
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    const res = await CategoriesService.delete(id);
    if (!res.error) fetchCategories()
  }, [])

  const handleEdit = useCallback(async (values: CategoryProps, id: string) => {
    const res = await CategoriesService.update(values, id)
    if (!res.error)
      fetchCategories()
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTimeout(() => {
      if (e.target.value.length >= 3) {
        const filteredCategories = data.filter(
          item => item.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setCategories(filteredCategories)
      } else if (e.target.value.length === 0) {
        setCategories(data)
      }
    }, 2000);
  }, []);

  const renderCell = useCallback((category: any, columnKey: string) => {
    // @ts-ignore
    const cellValue = category[columnKey];
    switch (columnKey) {
      case "title":
        return (
          cellValue
        );
      case "description":
        return (
          cellValue
        );
      case "actions":
        return (
          <div className="flex items-center gap-4 ">
            <div>
              <Edit
                title="Editar Categoria"
                category={category}
                submit={handleEdit}
              />
            </div>
            <div>
              <Delete
                title="Deletar Categoria"
                description="Você está prestes a deletar uma categoria"
                submit={() => handleDelete(category.id)}
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
          <span> Categoria</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Categoria</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            onChange={onChange}
            placeholder="Procurar Categoria"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Add
            title="Adicionar Categoria"
            submit={handleAdd}
          />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper data={categories} columns={columns} renderCell={renderCell} />
      </div>
    </div>
  );
};
