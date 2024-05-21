'use client'
import { useState } from "react";
import "./deleteBtn.css";

interface Props {
  movieId: string;
  handleDelete: Function
}

export const DeleteBtn = ({ movieId, handleDelete }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClick = () => {
    setIsSubmitting(true)
    handleDelete(movieId);
    setIsSubmitting(false)
  };
  return (
    <button className="delete-btn"
    onClick={handleClick}
    >
      {isSubmitting ? "Deleting" : "Delete"}
    </button>
  );
};
