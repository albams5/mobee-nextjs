"use client";
import { useState } from "react";
import "./editMovieBtn.css";
import { FormModal } from "../formModal/FormModal";
import { MovieForm } from "../movieForm/MovieForm";

type Props = {
  movieId: string;
  handlePatch: any
};

export const EditMovieBtn = ({ movieId, handlePatch }: Props) => {
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
          <MovieForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} movieId={movieId} handlePatch={handlePatch} />
          <button className="close-button"
          onClick={() => setIsModalOpen(!isModalOpen)}
          >
            X
          </button>
        </FormModal>
      )}
    </section>
  );
};
