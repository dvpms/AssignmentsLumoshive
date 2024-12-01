import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostDetailQuery } from "../redux/services/api";

const BlogDetail = () => {
  const { year, month, day, slug } = useParams();
  const postKey = `${year}/${month}/${day}/${slug}`; // Membuat postKey dengan format yang benar

  // Mengambil detail post menggunakan postKey
  const { data: postDetail, error, isLoading } = useGetPostDetailQuery(postKey);
  console.log(postKey); // Pastikan postKey sudah sesuai dengan format yang diharapkan oleh API
  console.log(postDetail); // Memeriksa apakah data diterima dengan benar

  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleGoBack = () => {
    navigate(-1); // Menavigasi ke halaman sebelumnya
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading post details.</p>;

  const { results } = postDetail || {}; // Menangani kemungkinan `postDetail` undefined

  return (
    <div className=" max-w-4xl mx-auto p-8">
      {/* Tombol Kembali */}
      <div className="flex justify-end">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 mb-6 border border-black hover:bg-black hover:text-white rounded-lg"
        >
          Back
        </button>
      </div>
      {/* Judul Post */}
      <h1 className="text-4xl font-bold text-center mb-6">
        {results?.title || "No title found"}
      </h1>
      {/* Tanggal dan Penulis */}
      <div className="text-center text-gray-600 mb-6">
        <p>{results?.date || "No date available"}</p>
      </div>

      {/* Konten Postingan */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: results?.content || "No content available",
        }}
      />
    </div>
  );
};

export default BlogDetail;
