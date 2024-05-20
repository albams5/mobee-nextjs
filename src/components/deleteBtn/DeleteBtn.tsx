'use client'
import "./deleteBtn.css";

interface Props {
  movieId: string;
  handleDelete: Function
}

export const DeleteBtn = ({ movieId, handleDelete }: Props) => {
  const handleClick = () => {
    handleDelete(movieId);
  };
  return (
    <button className="delete-btn"
    onClick={handleClick}
    >
      Delete
    </button>
  );
};
