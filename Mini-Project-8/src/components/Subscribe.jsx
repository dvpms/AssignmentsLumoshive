import React, { useState } from "react";
import { useSubscribeMutation } from "../redux/services/api";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribe, { isLoading, isError, error, isSuccess }] =
    useSubscribeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await subscribe( email ).unwrap(); // Mengirim email ke API
        setIsSubscribed(true); // Menandakan berhasil subscribe
        setEmail(""); // Reset email setelah submit
      } catch (err) {
        console.error("Subscription error:", err);
        // Handle error (misalnya, tampilkan pesan error)
      }
    }
  };

  return (
    <div className=" py-8 mt-4">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-purple-500 font-semibold">Newsletter</h3>
        <h2 className="text-5xl font-bold mb-4">Stories and Interviews</h2>
        <p className="mb-6 text-lg text-[#667085]">
          Subscribe to learn about new product features, the latest in
          technology, solutions, and updates.
        </p>

        {/* Form Subscribe */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center space-x-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 w-72 rounded-lg border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </form>

        {/* Success Message */}
        {isSubscribed && (
          <p className="mt-4 text-green-500 text-xl">
            Thank you for subscribing!
          </p>
        )}

        {/* Error Message */}
        {isError && (
          <p className="mt-4 text-red-500 text-xl">
            Oops, something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
