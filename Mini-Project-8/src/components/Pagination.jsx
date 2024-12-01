import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Import ikon panah

const Pagination = ({ currentPage, setPage }) => {
  // Fungsi untuk menangani perubahan halaman
  const handlePrev = () => {
      setPage(currentPage - 1);
  };

  const handleNext = () => {
      setPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center  justify-center lg:justify-between mt-8">
      {/* Tombol Prev */}
      <button
        onClick={handlePrev}
        className="px-4 py-2 text-gray-600 rounded-lg text-sm disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
         Previous
      </button>

      {/* Tombol Next */}
      <button
        onClick={handleNext}
        className="px-4 py-2 text-gray-600 rounded-lg disabled:opacity-50 text-sm"
      >
        Next 
        <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
