import { useAppSelector } from "@/store/hook";
import { createColumns } from "@/utils/createColumns";
import { columnSizes } from "@/utils/constant";
import styles from "./TableUsers.module.scss";
import { Table } from "@/ui/Table/Table";

export const TableUsers = () => {
  const columns = createColumns();
  const { users } = useAppSelector((state) => state.usersSlice);

  return (
    <div className={styles.tableContainer}>
      <Table data={users} columns={columns} defaultColumn={columnSizes} />
    </div>
  );
};
