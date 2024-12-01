import React, { useState } from "react";
import {
  useGetRecentPostsQuery,
  useGetPostsQuery,
} from "../redux/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options); // Menggunakan bahasa Inggris dengan format pendek bulan
};

const HomePage = () => {
  // State untuk pagination
  const [page, setPage] = useState(1);

  // Mengambil data dari API untuk recent posts dan all posts
  const { data: recentPosts, isLoading: loadingRecent } =
    useGetRecentPostsQuery(page);
  const { data: allPosts, isLoading: loadingAll } = useGetPostsQuery(page);
  console.log(recentPosts);

  if (loadingRecent || loadingAll) return <p>Loading...</p>;

  return (
    <>
      <div className="lg:px-24">
        <div className=" border-y border-black text-center">
          <h1 className="text-7xl font-bold my-2 lg:text-9xl
          ">
            THE BLOG
          </h1>
        </div>
        <div className="p-8">
          {/* Recent Posts Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-8">
              Recent Blog Posts
            </h2>

            {/* Recent Post Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts?.map((post) => (
                <div
                  key={post.key}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
                >
                  {/* Image */}
                  <img className="w-full" src={post.thumb} alt={post.title} />

                  <div className="px-6 py-4">
                    {/* Date */}
                    <div className="text-sm font-semibold text-purple-600 mb-2">
                      {formatDate(post.time)}
                    </div>
                    {/* Title */}
                    <div className="flex font-bold text-xl mb-2">
                      <div>{post.title}</div>
                      <div>
                        <Link to={`/details/${post.key}`}>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Link>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="text-gray-700 text-base">
                      {post.desc.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Tags and Author */}
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                      {post.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Posts Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-8">
              All Blog Posts
            </h2>
            {/* All Post Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts?.map((post) => (
                <div
                  key={post.key}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
                >
                  {/* Image */}
                  <img className="w-full" src={post.thumb} alt={post.title} />

                  <div className="px-6 py-4">
                    {/* Date */}
                    <div className="text-sm text-gray-500 mb-2">
                      {formatDate(post.time)} {/* Memformat tanggal */}
                    </div>

                    {/* Title */}
                    <div className=" flex font-bold text-xl mb-2">
                      <div>{post.title}</div>
                      <div>
                        <Link to={`/details/${post.key}`}>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Link>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base">
                      {post.desc.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Tags and Author */}
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                      {post.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Section */}
            <Pagination currentPage={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
