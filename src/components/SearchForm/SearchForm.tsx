import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "./SearchForm.module.scss";
import { setSearchQuery } from "@/store/slices/usersSlice";
import { Button } from "@/ui/Button/Button";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.usersSlice);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="search"
          placeholder="search users..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={styles.inputSearch}
        />
        <div className={styles.inputLoupe}>
          <AiOutlineSearch />
        </div>
      </div>
      <Button type="submit" variant="search">
        Search
      </Button>
    </form>
  );
};
