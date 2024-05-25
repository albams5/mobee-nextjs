import "./movie.css";
import { Metadata } from "next";
import { MovieDetail } from "@/components/movieDetail/MovieDetail";
import { genresFetch, getMovie } from "@/services/request.service";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id, name } = await getMovie(params.id);
    return {
      title: `${name}`,
      description: `${name} Page`,
    };
  } catch (error) {
    return {
      title: "Movie Page",
      description: "lore ipsum",
    };
  }
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovie(params.id);
  let genres = await genresFetch(movie);
  if (!genres) {
    genres = "Géneros no disponibles";
  }
  return (
    <>
      <MovieDetail genres={genres} movie={movie} />
    </>
  );
}
