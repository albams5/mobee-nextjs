import Image from "next/image";
import "./home.css";
import logo from "../logo.png";
import { Genre, MovieCard } from "@/components/movieCard/MovieCard";
import { MovieForm } from "@/components/movieForm/MovieForm";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

export interface Movie {
  id: number;
  name: string;
  image: string;
  score: number;
  genre: Genre | Genre[];
  sinopsis: string;
}

const getMovies = async () => {
  const dataMovies = await fetch("http://localhost:4000/movie");
  const response = await dataMovies.json();
  const movies = response.data;
  const movieCards = await Promise.all(
    movies.map((movie: Movie) => genreFetch(movie))
  );
  return movieCards;
};

const genreFetch = async (movie: Movie) => {
  const genreIDs = Array.isArray(movie.genre)
    ? movie.genre.map((genre) => genre.genreID)
    : [movie.genre.genreID];
  const genreNames = await Promise.all(
    genreIDs.map(async (genreID) => {
      const dataGenre = await fetch(`http://localhost:4000/genre/${genreID}`);
      const response = await dataGenre.json();
      return response.data.name;
    })
  );
  return <MovieCard key={movie.id} movie={movie} genre={genreNames} />;
};

export default async function Home() {
  const session = await getSession();
  let user;

  if (session && session.user) {
    user = session.user;
  } else {
    console.log("Error, user not found");
  }

  const movieCards = await getMovies();
  return (
    <>
      <main>
        <header className="home-header">
          <Image src={logo} alt="Logo" className="logo" />
          <h1 className="header-text">Welcome to Mobee, {user?.name} </h1>
          <Image
            height={40}
            width={50}
            alt="profile pic"
            src={
              user?.picture ??
              `https://res.cloudinary.com/dy87deadk/image/upload/v1715339706/kxseok21pawjrxvytn6e.jpg`
            }
            className="profile-pic"
          />
        </header>
        <section className="section-movies-rated">
          <p>Movies you have already rated:</p>
          <div className="movies-rated">{movieCards}</div>
        </section>
        <MovieForm />
        <Link href="/api/auth/logout" className="logout-container">
          <button className="loginlogoutbtn">Logout</button>
        </Link>
      </main>
    </>
  );
}