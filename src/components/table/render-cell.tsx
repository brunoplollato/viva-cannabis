import { UserProps } from "@/types/DTO";
import { Chip } from "@nextui-org/react";
import React from "react";
import { DeleteUser } from "../users/delete-user";
import { EditUser } from "../users/edit-user";

interface Props {
  user: any;
  columnKey: string | React.Key;
  loggedUser: UserProps;
}

export const RenderCell = ({ user, columnKey, loggedUser }: Props) => {
  console.log("🚀 ~ RenderCell ~ loggedUser:", loggedUser)
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "username":
      return (
        user.username
      );
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue === 'ADMIN' ? 'Administrador' : 'Redator'}</span>
          </div>
        </div>
      );
    case "verified":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue
              ? "success"
              : "danger"
          }
        >
          <span className="capitalize text-xs">
            {cellValue
              ? "verificado"
              : "não verificado"
            }
          </span>
        </Chip>
      );
    case "verified":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === true
              ? "success"
              : "danger"
          }
        >
          <span className="capitalize text-xs">{cellValue ? 'Verificado' : 'Não Verificado'}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <EditUser user={user} />
          </div>
          {user.id !== loggedUser.id && (
            <div>
              <DeleteUser id={user.id} />
            </div>
          )}
        </div>
      );
    default:
      return cellValue;
  }
};
