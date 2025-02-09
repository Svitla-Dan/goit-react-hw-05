import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../themoviedb-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

import style from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const page = params.get("page") ? Number(params.get("page")) : 1;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPagination, setShowPagination] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const { results, totalPages } = await searchMovies(query, page);
        if (results.length === 0) {
          setError("There are no movies matching your query");
        }
        setMovies(results);

        setShowPagination(totalPages > 1);
        setDisablePrev(page === 1);
        setDisableNext(page === totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query, page]);

  function handleSearch(searchString) {
    setParams({ query: searchString, page: 1 });
    setMovies([]);
  }

  const handlePrev = () => {
    params.set("page", page - 1);
    setParams(params);
  };

  const handleNext = () => {
    params.set("page", page + 1);
    setParams(params);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage error={error} />}
      {showPagination && (
        <div className={style.paginationWrapper}>
          <button
            className={style.paginationButton}
            onClick={handlePrev}
            disabled={disablePrev}
          >
            Prev
          </button>
          <button
            className={style.paginationButton}
            onClick={handleNext}
            disabled={disableNext}
          >
            Next
          </button>
        </div>
      )}
      {movies.length > 0 && !isLoading && <MovieList movies={movies} />}
      {isLoading && <Loader />}
    </div>
  );
}
