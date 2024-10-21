import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../themoviedb-api";
import { Suspense, useEffect, useRef, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import style from "./MovieDetailsPage.module.css";
import { format } from "date-fns";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  const releaseDate = movie?.release_date
    ? format(new Date(movie.release_date), " (yyyy)")
    : "";
  return (
    <>
      <div className={style.movieContainer}>
        <Link to={backLink.current} className={style.goBackLink}>
          &lt;&lt; Go back
        </Link>
        {error && <ErrorMessage error={error} />}
        {isLoading && <Loader />}
        {movie && (
          <div className={style.filmInfo}>
            <div className={style.filmPoster}>
              {movie.poster_path ? (
                <img
                  className={style.poster}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className={style.noPoster}>
                  <span className={style.noPosterText}>Poster Not Found</span>
                </div>
              )}
            </div>
            <div className={style.filmDetails}>
              <h2 className={style.filmTitle}>
                {movie.title}
                {releaseDate}
              </h2>
              <p className={style.userScore}>
                User score: {movie.vote_average}
              </p>
              <h3 className={style.subtitle}>Overview</h3>
              <p className={style.filmOverview}>{movie.overview}</p>
              <h3 className={style.subtitle}>Genres</h3>
              <ul className={style.genresList}>
                {movie.genres?.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={style.additionalInfo}>
        Additional information
        <ul>
          <li>
            <NavLink to="cast" className={style.additionalInfoLink}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={style.additionalInfoLink}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
