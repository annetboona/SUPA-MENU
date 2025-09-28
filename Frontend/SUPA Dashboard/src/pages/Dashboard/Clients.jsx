import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEye,
  FaTrashAlt,
  FaEdit,
  FaEllipsisV,
} from "react-icons/fa";
import axios from "../../utils/axois";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients", {
        params: { page: currentPage, limit: itemsPerPage },
      });

      // ✅ match API response
      setClients(res.data.clients || []);
      setTotalClients(res.data.totalClients || 0);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
      setClients([]); // prevent map crash
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage]);

  const handleDelete = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`/api/clients/${clientId}`);
        toast.success("Client deleted successfully!");
        if (clients.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchClients();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete client");
      }
    }
  };

  const handleEdit = async (clientId) => {
    navigate(`/api/clients/edit/${clientId}`);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/client/add")}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
        >
          <FaPlus /> New Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-semibold">All Clients</h1>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No clients found.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Client Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Detail Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {client.clientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {client.sales ? client.sales.toLocaleString() : 0} Frw
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/clients/${client._id}`)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaEye className="mr-2" /> View
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            client.category === "Hotel"
                              ? "bg-blue-100 text-blue-800"
                              : client.category === "Pub"
                              ? "bg-green-100 text-green-800"
                              : client.category === "Restaurant"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {client.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === client._id ? null : client._id
                          )
                        }
                        className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
                      >
                        <FaEllipsisV />
                      </button>
                      {activeDropdown === client._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                          <button
                            onClick={() => navigate(`/client/edit/${client._id}`)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(client._id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <FaTrashAlt className="mr-2" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="p-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages} ({totalClients} clients)
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
