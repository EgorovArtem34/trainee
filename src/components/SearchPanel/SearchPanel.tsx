import { SearchForm } from "@/components/SearchForm/SearchForm";
import styles from "./SearchPanel.module.scss";

export const SearchPanel = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Users</h2>
      <SearchForm />
    </header>
  );
};
