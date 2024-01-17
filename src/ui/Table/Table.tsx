import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { columnSizes } from "@/utils/constant";
import styles from "./Table.module.scss";
import { ColumnSizes } from "@/types";

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  defaultColumn: ColumnSizes;
}

export const Table = <T extends object>(props: TableProps<T>) => {
  const { columns, data, defaultColumn = columnSizes } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn,
    columnResizeMode: "onChange",
  });

  return (
    <table
      className={styles.table}
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles.tr}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={styles.th}
                style={{
                  width: header.getSize(),
                }}
              >
                <div
                  {...{
                    className: header.column.getCanSort() ? styles.sortBox : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <FaArrowUp className={styles.sortArrow} />,
                    desc: <FaArrowDown className={styles.sortArrow} />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
                <div
                  className={`${styles.resizer} ${
                    header.column.getIsResizing() ? styles["isResizing"] : ""
                  }`}
                  onDoubleClick={() => header.column.resetSize()}
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={styles.tr}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={styles.td}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
