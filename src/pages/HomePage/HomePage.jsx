import { useEffect, useState } from "react";
import {
  fetchTrendingMoviesDay,
  fetchTrendingMoviesWeek,
} from "../../themoviedb-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

import style from "./HomePage.module.css";

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [top, setTop] = useState("day");

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError("");

        const data =
          top === "day"
            ? await fetchTrendingMoviesDay()
            : await fetchTrendingMoviesWeek();
        setTrendMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [top]);

  return (
    <div>
      <ul className={style.btnTrend}>
        <li>
          <button className={style.filmsTop} onClick={() => setTop("day")}>
            Top Day
          </button>
        </li>
        <li>
          <button className={style.filmsTop} onClick={() => setTop("week")}>
            Top Week
          </button>
        </li>
      </ul>
      {isLoading && <Loader />}
      {trendMovies.length > 0 && <MovieList movies={trendMovies} />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
