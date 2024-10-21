import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { fetchMovieCredits } from "../../themoviedb-api";

import style from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [castList, setCastList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCastList() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchMovieCredits(movieId);
        data.length === 0 && setError("Sorry, there is no info...");
        setCastList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCastList();
  }, [movieId]);

  return (
    <div className={style.container}>
      {error && <ErrorMessage error={error} />}
      {loading && <Loader />}
      {castList.length > 0 && (
        <ul className={style.castList}>
          {castList.map((cast) => (
            <li key={cast.id} className={style.castItem}>
              {cast.profile_path ? (
                <div className={style.photoWrapper}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                    alt={cast.name}
                    className={style.profileImg}
                  />
                </div>
              ) : (
                <div className={style.noPhotoWrapper}>
                  <span className={style.noPhotoText}>No Photo</span>
                </div>
              )}
              <p className={style.actorName}>{cast.name}</p>
              <p className={style.actorCharacter}>
                Character: {cast.character}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
