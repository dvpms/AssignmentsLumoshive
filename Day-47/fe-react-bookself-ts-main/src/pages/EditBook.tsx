import React, { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import Book from "../types/Book";
import apiClient from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const EditBook: React.FC = () => {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [book, setBook] = useState<Book[]>([]);
  const { id } = useParams();

  const getDataById = async () => {
    const response = await apiClient.get(`/books/${id}`);
    const data = response.data;
    console.log(data);
    setBook(data);
  };

  useEffect(() =>{
    getDataById()
  },[])

  const handleUpdate = async (id:number, book: {
    title: string;
    author: string;
    description: string;
  }) => {
    try {
      await apiClient.put(`/books/${id}`, book);
      navigate("/");
      setIsUpdate(false)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mt-4">
      <h1>Update Book</h1>
      <BookForm onUpdate={handleUpdate} book={book} isUpdate={isUpdate}/>
    </div>
  );
};

export default EditBook;
