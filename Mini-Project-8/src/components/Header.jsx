import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "./ToggleSwitch";

const Header = () => {
  // State untuk toggle menu
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Header dengan Menu Burger */}
      <header className="sticky top-0 lg:flex lg:items-center lg:justify-between left-0 right-0 bg-white shadow-md z-50 lg:px-24">
        <div className="flex justify-between items-center p-4">
          <div className="text-xl font-bold">LumosBlog</div>

          {/* Menu Burger Icon */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg lg:hidden"
            aria-label="Open Menu"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>
        <nav>
          {/* Menu items */}
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/blog" className="hover:text-[#0F62FE]">
              Blog
            </Link>

            <Link to="/about" className="hover:text-[#0F62FE]">
              About
            </Link>
            <Link to="/about" className="hover:text-[#0F62FE]">
              Newsletter
            </Link>
            <div>
              <ToggleSwitch/>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar Menu */}
      <nav
        className={`fixed flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        role="navigation"
      >
        <ul className="flex flex-col items-center p-4 space-y-6">
          <h2 className="text-xl text-gray-800">Your Name</h2>
          <li>
            <Link
              to="/"
              className="text-xl text-gray-800 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-xl text-gray-800 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/newsletter"
              className="text-xl text-gray-800 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Newsletter
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-4" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} className="text-3xl" />
        </div>
      </nav>
    </div>
  );
};

export default Header;
