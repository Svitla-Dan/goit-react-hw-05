import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import style from "./FilmPreview.module.css";

export default function FilmPreview({ movie }) {
  const location = useLocation();
  const releaseDate = movie.release_date
    ? format(new Date(movie.release_date), " (yyyy)")
    : "";

  return (
    <div className={style.previewCard}>
      <Link
        to={`/movies/${movie.id}`}
        state={location}
        className={style.previewLink}
      >
        {movie.poster_path ? (
          <img
            className={style.posterImage}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className={style.noPosterWrapper}>
            <span className={style.noPosterText}>Poster Not Found</span>
          </div>
        )}
        <div className={style.filmTitle}>
          {movie.title}
          {releaseDate}
        </div>
      </Link>
    </div>
  );
}
