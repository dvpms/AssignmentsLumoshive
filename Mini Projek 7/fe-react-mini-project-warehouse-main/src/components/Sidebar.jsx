import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
          Warehouse
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/add-product"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>Add Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/stock-in"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>Stock In</span>
            </Link>
          </li>
          <li>
            <Link
              to="/stock-out"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">Stock Out</span>
            </Link>
          </li>
          <li>
          </li>
          <li>
            <Link
              to="/logs"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">Logs</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
