import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <span className={styles.text}>404</span>
    <h1 className={styles.title}>Page not found</h1>
    <Link to="/" className={styles.link}>
      Go to homepage
    </Link>
  </div>
);
