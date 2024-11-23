import React from "react";
import { useSelector } from "react-redux"; // Untuk mengambil data dari Redux
import ProductList from "./ProductList";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import StockIn from "./StockIn";
import Logs from "./Logs";
import StockOut from "./StockOut";

const MainContent = () => {
  // Ambil data produk dan log dari Redux
  const products = useSelector((state) => state.products.items); // Data produk
  const logs = useSelector((state) => state.logs.items); // Data log

  // Hitung total produk
  const totalProducts = products.length;

  // Hitung total Stock In
  const totalStockIn = logs
    .filter((log) => log.type === "stock_in").length

  // Hitung total Stock Out
  const totalStockOut = logs
    .filter((log) => log.type === "stock_out").length

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        {/* Statistik */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3>Total Products</h3>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h3>Stock In Process</h3>
            <p className="text-3xl font-bold">{totalStockIn}</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h3>Stock Out Process</h3>
            <p className="text-3xl font-bold">{totalStockOut}</p>
          </div>
        </div>
        {/* Daftar Produk */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/stock-in" element={<StockIn />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/stock-out" element={<StockOut />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
