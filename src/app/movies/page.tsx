"use server";

import Image from "next/image";
import "./home.css";
import logo from "../../../public/logo.png";
import { MovieCard } from "@/components/movieCard/MovieCard";
import { MovieForm } from "@/components/movieForm/MovieForm";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import { getMovies, postNewMovie } from "@/services/request.service";
import { Metadata } from "next";

const localhostUrl = process.env.NEXT_PUBLIC_LOCALHOST_URL;

export const metadata: Metadata = {
  title: "Mobee App Home",
  description: "App to rate your fav movies"
}

export interface Movie {
  id: string;
  name: string;
  image: string;
  score: number;
  genre: [];
  sinopsis: string;
}

export interface GenreOnMovies {
  movieID: string;
  genreID: string;
}

export const genreFetch = async (movie: Movie) => {
  const genreNamesPromises = movie.genre.map(
    async (genreObj: GenreOnMovies) => {
      const genreID = genreObj.genreID;
      const dataGenre = await fetch(`${localhostUrl}/genre/${genreID}`);
      const response = await dataGenre.json();
      return response.data.name;
    }
  );

  const genreNames = await Promise.all(genreNamesPromises);

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
  const handleFormSubmit = async (movieData: FormData) => {
    "use server";
    await postNewMovie("1", movieData);
  };
  return (
    <>
      <main>
        <header className="home-header">
          <Image src={logo} alt="Logo" className="logo" />
          <h1 className="header-text">Welcome to Mobee, {user?.name} </h1>
          <Image
            height={60}
            width={60}
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
        <section className="section-movie-form">
          Rate your movies here:
          <MovieForm handleFormSubmit={handleFormSubmit} />
        </section>
        <Link href="/api/auth/logout" className="logout-container">
          <button className="loginlogoutbtn">Logout</button>
        </Link>
      </main>
    </>
  );
}
