import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "./TableUsers.module.scss";
import { fetchUsers } from "@/store/slices/usersSlice";

export const TableUsers = () => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.usersSlice);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users?.length]);

  console.log(users);

  return <div>12</div>;
};
