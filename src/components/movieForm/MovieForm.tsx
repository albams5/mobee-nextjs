"use client";

import { FormEvent, useState } from "react";
import "./movieForm.css";
import { getGenres, postNewMovie } from "@/services/request.service";
import { Genre } from "../movieCard/MovieCard";

type GenreId = {
  id: number
}

export const MovieForm = async () => {
  const [movieData, setMovieData] = useState<{
    name: string;
    image: File | null;
    score: string;
    genre: number[];
    sinopsis: string;
  }>({
    name: "",
    image: null,
    score: "",
    genre: [],
    sinopsis: "",
  });;

  const { name, image, score, genre, sinopsis } = movieData;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("score", score);
  formData.append("sinopsis", sinopsis);
  const genreString = genre.join(",");
  formData.append("genre", genreString);

  if (image !== null) {
    formData.append("image", image);
  }

  const genres: Genre[] = await getGenres();
  console.log({genres})

  const handleInputChange = (event: Event | any) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("dentro del handleSubmit");
    console.log("moviedata antes de enviarla al back", movieData);
    postNewMovie("1", formData);
  };

  const handleImageChange = (event: Event | any) => {
    const file = event.target.files[0];
    console.log(file);
    setMovieData({
      ...movieData,
      image: file,
    });
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const genreId = parseInt(value);
    let updatedGenres: number[];
    if (checked) {
      updatedGenres = [...movieData.genre, genreId];
    } else {
      updatedGenres = movieData.genre.filter((genre) => genre !== genreId);
    }
    setMovieData({
      ...movieData,
      genre: updatedGenres,
    });
  };

  return (
    <section className="section-movie-form">
      Rate your movies here:
      <form onSubmit={handleSubmit} className="movie-form">
        <label htmlFor="name">Title:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={movieData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="sinopsis">Sinopsis:</label>
        <input
          type="text"
          id="sinopsis"
          name="sinopsis"
          value={movieData.sinopsis}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          required
        />
        <label htmlFor="score">Score:</label>
        <select
          value={movieData.score}
          onChange={handleInputChange}
          id="score"
          name="score"
        >
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <label htmlFor="genre">Genre:</label>
        <div className="genre-checkboxes">
          {genres.map((genre: Genre) => (
            <label key={genre.id}>
              <input
                type="checkbox"
                value={genre.id}
                checked={movieData.genre.includes(genre.id)}
                onChange={handleGenreChange}
              />
              {genre.name}
            </label>
          ))}
        </div>
        <input className="movies-form-btn" type="submit" value="Send" />
      </form>
    </section>
  );
};
