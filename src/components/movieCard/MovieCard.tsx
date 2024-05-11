import { Movie } from "@/app/movies/page";
import "./MovieCard.css";
import Link from "next/link";

type Props = {
  movie: Movie;
  genre: Genre[];
};

export type Genre = {
  genreID: number;
  name: string;
};

export const MovieCard = ({ movie, genre }: Props) => {
  return (
    <Link className="moviecard-link" href={`/movie/${movie.id}`}>
      <div className="movie-card">
        <img className="movie-img" src={movie.image} />
        <section className="movie-info">
          <h3 className="movie-title">{movie.name}</h3>
          <p className="movie-score">Score: {movie.score}</p>
          <p className="movie-genre">Genre: {genre.join(", ")}</p>
        </section>
      </div>
    </Link>
  );
};
