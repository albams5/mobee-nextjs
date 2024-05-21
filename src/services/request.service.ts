import { revalidatePath } from "next/cache";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { GenreOnMovies, Movie, genreFetch } from "@/app/movies/page";
import { notFound, redirect } from "next/navigation";

const localhostUrl = process.env.NEXT_PUBLIC_LOCALHOST_URL;


export const removeMovie = async (id: string) => {
  const {accessToken} = await getAccessToken()
  try {
    const res = await fetch(`${localhostUrl}/movie/${id}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    if (res.ok) {
      revalidatePath(`/movies`, "page")
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
  redirect("/movies")
};

export const postNewMovie = async (userID: string, movieData: any) => {
  const {accessToken} = await getAccessToken()
  console.log("dentro de postNewMovie");
  console.log(movieData);
  const res = await fetch(`${localhostUrl}/movie/${userID}`, {
    method: "POST",
    headers: {
          Authorization: `Bearer ${accessToken}`
      },
    body: movieData,
  });
  if (res.ok) {
    revalidatePath("/movies");
  }
};

export const patchMovie = async (movieID: string, movieData: any) => {
  const {accessToken} = await getAccessToken()
  console.log("dentro de patchMovie");
  console.log(movieData);
  const res = await fetch(`${localhostUrl}/movie/${movieID}`, {
    method: "PATCH",
    headers: {
          Authorization: `Bearer ${accessToken}`
      },
    body: movieData,
  });
  if (res.ok) {
    revalidatePath(`/movie/${movieID}`);
  }
};

// export const postNewMovie = async (userID:string, movieData: any) => {
//     // const {accessToken} = await getAccessToken()
//     // const headers = new Headers
//     // headers.append('Content-Type', 'application/json');
//     // headers.append('Accept', 'application/json');
//     // headers.append('Origin','http://localhost:3000');
//     const res = await fetch(`http://localhost:4000/movie/${userID}`, {

//         method: 'POST',
//         // headers: headers,
//         // mode: "cors",
//         // credentials: "include",
//         body: movieData
//     });
//     // if (res.ok) {
//     //   // revalidateTag('/movies')
//     // revalidatePath("/movies", "page")
// // }
// }

export const getGenres = async () => {
  const dataGenre = await fetch(`${localhostUrl}/genre`);
  const response = await dataGenre.json();
  return response.data;
};

export const getMovie = async (id: string): Promise<Movie> => {
  try {
    const dataMovie = await fetch(`${localhostUrl}/movie/${id}`, {
      next: {
        revalidate: 60,
      },
    });
    const response = await dataMovie.json();
    const movie = response.data;

    console.log(movie.name);

    return movie;
  } catch (error) {
    notFound();
  }
};

export const genresFetch = async (movie: Movie) => {
  const genreNamesPromises = movie.genre.map(
    async (genreObj: GenreOnMovies) => {
      const genreID = genreObj.genreID;
      const dataGenre = await fetch(`${localhostUrl}/genre/${genreID}`);
      const response = await dataGenre.json();
      return response.data.name;
    }
  );
  const genreNames = await Promise.all(genreNamesPromises);
  return genreNames.join(", ");
};

export const getMovies = async () => {
  const dataMovies = await fetch(`${localhostUrl}/movie`, {
    next: { tags: ["movies"] },
  });
  const response = await dataMovies.json();
  const movies = response.data;
  const movieCards = await Promise.all(
    movies.map((movie: Movie) => genreFetch(movie))
  );
  return movieCards;
};
