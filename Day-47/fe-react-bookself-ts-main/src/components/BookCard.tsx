import React from "react";
import Book from "../types/Book";
import { Link } from "react-router-dom";
interface BookCardProps {
  book: Book;
  onDelete: (bookId: number) => void;
  onUpdate: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete, onUpdate }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{book.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
      <p className="card-text">{book.description}</p>
      <button className="btn btn-outline-danger" onClick={()=>{onDelete(book.id)}}>Delete</button>
      <Link to={`/update/${book.id}`}>
       <button className="btn btn-outline-warning" onClick={()=>{onUpdate(book.id)}}>Update</button>
      </Link>
    </div>
  </div>
);

export default BookCard;
