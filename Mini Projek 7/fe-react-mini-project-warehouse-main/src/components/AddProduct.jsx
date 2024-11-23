import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/async/productSlice";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss"; // Import SweetAlert2 CSS

const AddProduct = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0, // Default nilai awal adalah angka
    stock: 0, // Stok juga berupa angka
  });

  const [scannerActive, setScannerActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Konversi price dan stock menjadi angka
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi jika ada input kosong
    if (!newProduct.id || !newProduct.name || !newProduct.price || !newProduct.stock) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "All fields are required!",
        confirmButtonColor: "#fadb14",
      });
      return;
    }

    // Dispatch untuk menambahkan produk
    dispatch(addProduct(newProduct));

    // Tampilkan pesan sukses
    Swal.fire({
      icon: "success",
      title: "Product Added",
      text: `${newProduct.name} has been successfully added!`,
      confirmButtonColor: "#52c41a",
    });

    // Reset form setelah produk ditambahkan
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Scan ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product ID (Scan Barcode)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              name="id"
              value={newProduct.id}
              onChange={handleChange}
              readOnly
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Scan Barcode"
            />
            <button
              type="button"
              onClick={() => setScannerActive(!scannerActive)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
            >
              {scannerActive ? "Stop Scan" : "Scan"}
            </button>
          </div>
        </div>

        {/* Barcode Scanner */}
        {scannerActive && (
          <div className="mt-4">
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, result) => {
                if (result) {
                  setNewProduct({ ...newProduct, id: result.text });
                  setScannerActive(false); // Stop scanner setelah scan berhasil
                }
              }}
            />
          </div>
        )}

        {/* Input Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Input Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Input Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Input Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
