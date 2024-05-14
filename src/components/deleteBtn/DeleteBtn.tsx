'use client'
import { removeMovie } from "@/services/request.service";
import "./deleteBtn.css";

interface Props {
  movieId: number;
}

export const DeleteBtn = ({ movieId }: Props) => {
  return (
    <button className="delete-btn"
    onClick={() => removeMovie(movieId)}
    >
      Delete
    </button>
  );
};
