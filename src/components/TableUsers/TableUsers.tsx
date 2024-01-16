import { useEffect } from "react";
import { useReactTable } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "./TableUsers.module.scss";
import { fetchUsers } from "@/store/slices/usersSlice";
import { tableHeaders } from "@/utils/constant";

export const TableUsers = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersSlice);

  // const columns = [tableHeaders.

  // const columns = [
  //  { accessorKey: '',
  //   header: 'Task',
  //   cell: (props) => <p>{props.getValue()}</p>
  // }
  // ];

  // const table = useReactTable({
  //   data: users,
  //   columns:
  // });

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users?.length]);

  console.log(users);

  return (
    <div className={styles.container}>
      <h2>Users data</h2>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            // вместо отчества - матчество maidenName
            const {
              id,
              firstName,
              lastName,
              maidenName,
              gender,
              phone,
              address: { address, city },
            } = user;
            return (
              <tr key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{maidenName}</td>
                <td>{gender}</td>
                <td>{phone}</td>
                <td>{`${city}, ${address}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
