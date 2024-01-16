import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchUsers } from "@/store/slices/usersSlice";
import styles from "./SearchForm.module.scss";

export const SearchForm = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <form className={styles.formSearch} onSubmit={handleSubmit}></form>;
};
