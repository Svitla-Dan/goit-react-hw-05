import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { fetchMovieReviews } from "../../themoviedb-api";

import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        setErrorMessage("");
        const data = await fetchMovieReviews(movieId);
        data.length === 0 &&
          setErrorMessage("We don't have any reviews for this movie");
        setReviewList(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.wrapper}>
      {errorMessage && <ErrorMessage error={errorMessage} />}
      {reviewList.length > 0 && (
        <ul className={styles.reviewItems}>
          {reviewList.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.authorName}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {loading && <Loader />}
    </div>
  );
}
