"use client";
import { useState } from "react";
import "./editMovieBtn.css";
import { FormModal } from "../formModal/FormModal";
import { MovieForm } from "../movieForm/MovieForm";

type Props = {
  movieId: number;
};

export const EditMovieBtn = ({ movieId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditMovie = () => {
    setIsModalOpen(true);
  };
  return (
    <section>
      <button className="edit-btn" onClick={handleEditMovie}>
        Edit
      </button>
      {isModalOpen && (
        <FormModal key={movieId} onClose={() => setIsModalOpen(false)}>
          <MovieForm />
          <button className="close-button" onClick={() => setIsModalOpen(false)}>
            X
          </button>
        </FormModal>
      )}
    </section>
  );
};
