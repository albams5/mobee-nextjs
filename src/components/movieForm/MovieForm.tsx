"use client";

import React, { useState, useEffect } from "react";
import "./movieForm.css";
import { getGenres } from "@/services/request.service";
import { Genre } from "../movieCard/MovieCard";

export const MovieForm = ({ handleFormSubmit, movieId, handlePatch }: any) => {
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
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
    };

    fetchGenres();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", movieData.name);
    formData.append("score", movieData.score);
    formData.append("sinopsis", movieData.sinopsis);
    const genreString = movieData.genre.join(",");
    formData.append("genre", genreString);

    if (movieData.image !== null) {
      formData.append("image", movieData.image);
    }

    await handleFormSubmit(formData);
    setIsSubmitting(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file !== undefined) {
      setMovieData({
        ...movieData,
        image: file,
      });
    }
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const genreId = parseInt(value);
    let updatedGenres;
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
    
      <form onSubmit={handleSubmit} className="movie-form">
        <label htmlFor="name">Title:</label>
        <input
          className="movieform-input"
          type="text"
          id="name"
          name="name"
          value={movieData.name}
          onChange={handleInputChange}
          placeholder="Ex. Jurassic Park"
          required
        />
        <label htmlFor="sinopsis">Sinopsis:</label>
        <input
          className="movieform-input"
          type="text"
          id="sinopsis"
          name="sinopsis"
          value={movieData.sinopsis}
          onChange={handleInputChange}
          placeholder="Ex. Jurassic Park is a movie about a dinosaur's park."
          required
        />
        <label htmlFor="image">Image:</label>
        <input
          className="movieform-input-image"
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          required
        />
        <label htmlFor="score">Score:</label>
        <select
          className="movieform-select"
          value={movieData.score}
          onChange={handleInputChange}
          id="score"
          name="score"
        >
          <option value="" disabled>
            Choose a number
          </option>
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
        <input
          className="movies-form-btn"
          type="submit"
          value={isSubmitting ? "Sending" : "Send"}
          disabled={isSubmitting}
        />
      </form>
  );
};
