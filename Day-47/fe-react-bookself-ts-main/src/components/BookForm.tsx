import React, { useEffect, useState, FormEvent } from "react";
import Book from "../types/Book";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
  onUpdate?: (id: number, book: Omit<Book, "id">) => void;
  book?: Book;
  isUpdate?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, onUpdate, book, isUpdate }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Mengisi state dengan data buku jika dalam mode update
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
    }
  }, [book]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (isUpdate && book) {
      onUpdate(book.id, { title, author, description });
    } else {
      onSubmit({ title, author, description });
    }
    // Mengatur ulang state setelah submit
    setTitle("");
    setAuthor("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title} // Gunakan state title
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          value={author} // Gunakan state author
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description} // Gunakan state description
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!title || !author || !description}
      >
        <i className="bi bi-plus-square me-2"></i> {isUpdate ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;