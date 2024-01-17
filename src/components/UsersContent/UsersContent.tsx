import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "./UsersContent.module.scss";
import { Loader } from "@/ui/Loader/Loader";
import { TableUsers } from "../TableUsers/TableUsers";
import { fetchUsers } from "@/store/slices/usersSlice";

export const UsersContent = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    isLoadings: { isFetchUsersLoading, isSearchUsersLoading },
    errors: { fetchUsersErr, searchUsersErr },
    searchQuery,
  } = useAppSelector((state) => state.usersSlice);
  const isLoading = isFetchUsersLoading || isSearchUsersLoading;
  const errorMessage = fetchUsersErr || searchUsersErr;

  useEffect(() => {
    if (users.length === 0 && !searchQuery) {
      dispatch(fetchUsers());
    }
  }, [dispatch, searchQuery, users.length]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users data</h2>

      {isLoading && <Loader />}
      {errorMessage && <p className="center">Error: {errorMessage}</p>}
      {!isLoading &&
        !errorMessage &&
        (users.length === 0 ? (
          <p className="center">No results found</p>
        ) : (
          <TableUsers />
        ))}
    </div>
  );
};
