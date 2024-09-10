import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

type Props = {
  data: any[];
  columns: any[];
  renderCell: (row: any, columnKey: any) => any;
}

export const TableWrapper = ({ data, columns, renderCell }: Props) => {
  const { data: session } = useSession();
  const loggedUser = session?.user;
  return (
    <div className=" w-full flex flex-col gap-4">
      {loggedUser && (
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
          <TableBody items={data} emptyContent={"Nenhum resultado encontrado."}>
            {(row) => (
              <TableRow>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(row, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
