import { Movie } from "@/app/movies/page";
import "./MovieCard.css";
import Link from "next/link";
import Image from "next/image";

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
        <Image height={13} width={140} alt="movie poster" className="movie-img" src={movie.image} />
        <section className="movie-info">
          <h3 className="movie-title">{movie.name}</h3>
          <p className="movie-score">Score: {movie.score}</p>
          <p className="movie-genre">Genre: {genre.join(", ")}</p>
        </section>
      </div>
    </Link>
  );
};
