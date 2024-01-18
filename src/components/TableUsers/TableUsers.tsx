import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Address, User } from "@/store/types";
import { Table } from "@/ui/Table/Table";
import { columnSizes } from "@/utils/constant";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useMemo } from "react";
import styles from "./TableUsers.module.scss";
import { setShowUserModal } from "@/store/slices/usersSlice";

export const TableUsers = () => {
  const dispatch = useAppDispatch();
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First name",
      },
      {
        accessorKey: "lastName",
        header: "Last name",
      },
      {
        accessorKey: "maidenName",
        header: "Maiden name",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableSorting: false,
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: (info) => {
          const { address, city } = info.getValue() as Address;
          return `${city}, ${address}`;
        },
        sortingFn: (
          rowA: Row<User>,
          rowB: Row<User>,
          columnId: string
        ): number => {
          const address1 = {
            city: (rowA.getValue(columnId) as Address).city,
            street: (rowA.getValue(columnId) as Address).address,
          };
          const address2 = {
            city: (rowB.getValue(columnId) as Address).city,
            street: (rowB.getValue(columnId) as Address).address,
          };

          if (
            address1.city < address2.city ||
            (address1.city === address2.city &&
              address1.street < address2.street)
          ) {
            return 1;
          }

          if (
            address1.city > address2.city ||
            (address1.city === address2.city &&
              address1.street > address2.street)
          ) {
            return -1;
          }

          return 0;
        },
      },
    ],
    []
  );
  const { users } = useAppSelector((state) => state.usersSlice);

  const showUserModal = (id: number) => dispatch(setShowUserModal({ id }));

  return (
    <div className={styles.tableContainer}>
      <Table
        data={users}
        columns={columns}
        defaultColumn={columnSizes}
        handleClick={showUserModal}
        isTrBodyBtn={true}
      />
    </div>
  );
};
