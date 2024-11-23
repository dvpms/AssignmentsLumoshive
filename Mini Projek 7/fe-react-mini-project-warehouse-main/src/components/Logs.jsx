import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogs } from "../redux/async/logSlice";
const Logs = () => {
  const dispatch = useDispatch();
  const { items: logs, loading, error } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs()); // Ambil data logs dari server saat komponen dimuat
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Logs</h2>

      {/* Tampilkan loading jika data sedang dimuat */}
      {loading && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">Loading logs...</p>
      )}

      {/* Tampilkan error jika terjadi kesalahan */}
      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
          Error fetching logs: {error}
        </p>
      )}

      {/* Tampilkan tabel logs jika data tersedia */}
      {!loading && !error && logs.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Product ID</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    {new Date(log.date).toLocaleString()} {/* Format tanggal */}
                  </td>
                  <td className="px-6 py-4">{log.product_id}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        log.type === "stock_in"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.type.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">{log.quantity}</td>
                  <td className="px-6 py-4">{log.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tampilkan pesan jika tidak ada log */}
      {!loading && !error && logs.length === 0 && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          No logs available.
        </p>
      )}
    </div>
  );
};

export default Logs;
