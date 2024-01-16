import { useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "./TableUsers.module.scss";
import { fetchUsers } from "@/store/slices/usersSlice";
import { createColumns } from "@/utils/createColumns";

export const TableUsers = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersSlice);
  const columns = createColumns();

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 400,
    },
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users?.length]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users data</h2>
      <div className={styles.tableContainer}>
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
                    {header.column.columnDef.header as string}
                    <div
                      className={`${styles.resizer} ${
                        header.column.getIsResizing()
                          ? styles["isResizing"]
                          : ""
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
      </div>
    </div>
  );
};
