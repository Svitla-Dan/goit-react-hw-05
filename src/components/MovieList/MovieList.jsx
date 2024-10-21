import FilmPreview from "../FilmPreview/FilmPreview";
import style from "./MovieList.module.css";

export default function MovieList({ movies = [] }) {
  return (
    <ul className={style.collection}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <li className={style.collectionItem} key={movie.id}>
            <FilmPreview movie={movie} />
          </li>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </ul>
  );
}
