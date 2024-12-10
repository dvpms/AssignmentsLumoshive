import React from "react";
import BookCard from "./BookCard";
import Book from "../types/Book";

interface BookListProps {
  books: Book[];
  onDelete: (bookId: number) => void;
  onUpdate: (bookId: number) => void;
  isUpdate: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, onUpdate}) => (
  <div className="row">
    {books.length > 0 ? (
      books.map((book) => (
        <div className="col-md-4" key={book.id}>
          <BookCard book={book} onDelete={onDelete} onUpdate={onUpdate}/>
        </div>
      ))
    ) : (
      <div className="alert alert-light" role="alert">
        No books found.
      </div>
    )}
  </div>
);

export default BookList;
