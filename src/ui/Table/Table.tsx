import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import cn from "classnames";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { columnSizes } from "@/utils/constant";
import styles from "./Table.module.scss";
import { TableProps } from "@/types";
import { User } from "@/store/types";

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    columns,
    data,
    defaultColumn = columnSizes,
    isTrBodyBtn = false,
    handleClick = () => {},
  } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn,
    columnResizeMode: "onChange",
  });

  const trBodyClasses = cn(styles.tr, {
    [styles["trBtn"]]: isTrBodyBtn,
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
          <tr
            key={row.id}
            className={trBodyClasses}
            onClick={() => handleClick((row.original as User).id)}
          >
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
