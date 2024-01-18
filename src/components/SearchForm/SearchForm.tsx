import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "./SearchForm.module.scss";
import { searchUsers, setSearchQuery } from "@/store/slices/usersSlice";
import { Button } from "@/ui/Button/Button";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const {
    searchQuery,
    isLoadings: { isSearchUsersLoading },
  } = useAppSelector((state) => state.usersSlice);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formattedSearchQuery = searchQuery.toLowerCase();
    dispatch(searchUsers(searchQuery));
    // setSearchQuery("");
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <fieldset disabled={isSearchUsersLoading} className={styles.fieldset}>
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
        <Button type="submit" variant="search" aria-label="search users">
          Search
        </Button>
      </fieldset>
    </form>
  );
};
