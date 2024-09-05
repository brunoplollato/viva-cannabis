import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { columns } from "./data";
import { RenderCell } from "./render-cell";

type Props = {
  data: any[]
}

export const TableWrapper = ({ data }: Props) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Usuários">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(user) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ user: user, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
