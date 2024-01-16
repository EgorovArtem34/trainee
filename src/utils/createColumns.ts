import { Address } from "./../store/types";
import { CellContext } from "@tanstack/react-table";
import { columnsHeaderNames, tableHeaders } from "./constant";

export const createColumns = () =>
  tableHeaders.map((tableHeader) => {
    const column = {
      accessorKey: tableHeader,
      header: columnsHeaderNames[tableHeader],
    };
    if (tableHeader === "address") {
      const columnCell = {
        cell: (info: CellContext<typeof tableHeaders, Address>) => {
          const { address, city } = info.getValue();
          return `${city}, ${address}`;
        },
      };
      return { ...column, ...columnCell };
    }
    return column;
  });
