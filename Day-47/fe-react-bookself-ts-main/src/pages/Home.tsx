import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Book from "../types/Book";
import apiClient from "../utils/api";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const navigate = useNavigate()

  const fetchBooks = async () => {
    apiClient
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    try {
      setIsUpdate(true)
      navigate("/update")
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-4">
      <h1>Bookshelf</h1>
      <BookList
        books={books}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default Home;
