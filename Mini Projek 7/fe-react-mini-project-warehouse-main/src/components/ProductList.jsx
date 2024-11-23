import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../redux/async/productSlice";
import { fetchLogs } from "../redux/async/logSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchLogs());
  }, [dispatch]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setToggleEdit(true);
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteProduct = () => {
    dispatch(deleteProduct(productToDelete));
    setConfirmDelete(false);
    setProductToDelete(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct(selectedProduct));
    setToggleEdit(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div></div>
        <div className="relative">
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for products"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{product.id}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit Product */}
      {toggleEdit && (
        <div
          id="editProductModal"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <form
              onSubmit={handleUpdate}
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Product
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setToggleEdit(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <label className="block">
                  Name
                  <input
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                      })
                    }
                    className="block w-full p-2 mt-1 border rounded-lg"
                  />
                </label>
                <label className="block">
                  Description
                  <textarea
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                    className="block w-full p-2 mt-1 border rounded-lg"
                  />
                </label>
                <label className="block">
                  Price
                  <input
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: +e.target.value,
                      })
                    }
                    className="block w-full p-2 mt-1 border rounded-lg"
                  />
                </label>
                <label className="block">
                  Stock
                  <input
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        stock: +e.target.value,
                      })
                    }
                    className="block w-full p-2 mt-1 border rounded-lg"
                  />
                </label>
              </div>

              <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setToggleEdit(false)}
                  className="px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirm Delete */}
      {confirmDelete && (
        <div
          id="deleteProductModal"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-full max-w-md max-h-full bg-white p-6 rounded-lg shadow dark:bg-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center mt-6 space-x-4">
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
