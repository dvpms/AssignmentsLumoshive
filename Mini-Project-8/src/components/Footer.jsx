import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black px-24">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:justify-start lg:space-x-2 lg:space-y-0 font-semibold lg:font-normal justify-between items-center px-6 space-y-2 text-xl">
        <div className="social text-center lg:ms-2 lg:space-x-2 flex flex-col lg:flex-row lg:space-y-0 space-y-2

        ">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Email
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            RSS feed
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Add to Feedly
          </a>
        </div>
        <div className=" text-black text-center lg:mt-0 mt-2 lg:order-first">
          &copy; 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
