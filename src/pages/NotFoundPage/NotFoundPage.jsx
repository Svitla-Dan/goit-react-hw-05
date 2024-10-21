import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <p className={styles.notFound}>
        The page you are looking for does not exist
      </p>
      <Link className={styles.homeLink} to="/">
        Return to Homepage
      </Link>
    </div>
  );
}
