import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStock } from "../redux/async/productSlice"; // Update stock pada produk
import { addLog } from "../redux/async/logSlice"; // Tambahkan log baru
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Swal from "sweetalert2";

const StockOut = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items); // Ambil data produk dari Redux
  const [scannedProductId, setScannedProductId] = useState("");
  const [stockToRemove, setStockToRemove] = useState(0);
  const [note, setNote] = useState(""); // State untuk catatan
  const [scannerActive, setScannerActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temukan produk berdasarkan ID yang dipindai
    const scannedProduct = products.find((product) => product.id === scannedProductId);

    // Validasi jika produk tidak ditemukan
    if (!scannedProduct) {
      Swal.fire({
        icon: "error",
        title: "Product Not Found",
        text: "Please add the product first via Add Product.",
        confirmButtonColor: "#ff4d4f",
      });
      return;
    }

    // Validasi stok yang diambil harus lebih besar dari 0 dan tidak melebihi stok tersedia
    if (stockToRemove <= 0 || stockToRemove > scannedProduct.stock) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Stock",
        text: "Stock to remove must be greater than 0 and not exceed available stock.",
        confirmButtonColor: "#fadb14",
      });
      return;
    }

    // Validasi note harus diisi
    if (note.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Note Required",
        text: "Please provide a note for the stock out action.",
        confirmButtonColor: "#fadb14",
      });
      return;
    }

    // Hitung stok terbaru
    const updatedStock = scannedProduct.stock - Number(stockToRemove);

    // Dispatch untuk memperbarui stok produk
    dispatch(updateStock({ id: scannedProductId, stock: updatedStock }));

    // Buat log untuk stock out
    const log = {
      product_id: scannedProductId,
      type: "stock_out",
      quantity: stockToRemove,
      note: note, // Note yang diisi pengguna
      date: new Date().toISOString(), // Timestamp saat ini
    };

    // Dispatch untuk menambahkan log
    dispatch(addLog(log));

    // Konfirmasi sukses
    Swal.fire({
      icon: "success",
      title: "Stock Updated",
      text: `The stock for ${scannedProduct.name} has been successfully updated!`,
      confirmButtonColor: "#52c41a",
    });

    // Reset form setelah submit
    setScannedProductId("");
    setStockToRemove(0);
    setNote("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Stock Out</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Scan Product ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product ID (Scan Barcode)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={scannedProductId}
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
                  setScannedProductId(result.text); // Simpan ID produk yang dipindai
                  setScannerActive(false); // Nonaktifkan scanner setelah scan berhasil
                }
              }}
            />
          </div>
        )}

        {/* Product Information */}
        {scannedProductId && (
          <div className="p-4 bg-gray-100 rounded-lg">
            {products
              .filter((product) => product.id === scannedProductId)
              .map((product) => (
                <div key={product.id}>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Current Stock:</strong> {product.stock}
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* Input Stock to Remove */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stock to Remove
          </label>
          <input
            type="number"
            value={stockToRemove}
            onChange={(e) => setStockToRemove(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter quantity to remove"
          />
        </div>

        {/* Input Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter a note for the stock out action"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Remove Stock
        </button>
      </form>
    </div>
  );
};

export default StockOut;
