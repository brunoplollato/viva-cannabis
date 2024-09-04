"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { AddPartner } from "./add-partner";

export const Partners = () => {
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
          <span>Parceiros</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Parceiros</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Procurar parceiros"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddPartner />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {/* <TableWrapper data={[]} /> */}
      </div>
    </div>
  );
};
