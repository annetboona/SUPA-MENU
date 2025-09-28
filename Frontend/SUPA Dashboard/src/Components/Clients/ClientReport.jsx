import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axois";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const ClientReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`/api/clients/${id}`);
        setClient(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch client details"
        );
        toast.error("Failed to load client details.");
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate("/clients")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <FaArrowLeft className="mr-2" /> Back to Clients
        </button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6 text-center text-gray-600">Client not found.</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/clients")}
            className="text-gray-600 hover:text-gray-900 mr-4"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Client Details: {client.clientName}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Basic Information
            </h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {client.clientName}
            </p>
            <p className="text-gray-600">
              <strong>Representative:</strong> {client.representative}
            </p>
            <p className="text-gray-600">
              <strong>Category:</strong> {client.category}
            </p>
            <p className="text-gray-600">
              <strong>Date of Creation:</strong>{" "}
              {new Date(client.dateOfCreation).toLocaleDateString()}
            </p>
            {/* Fixed: Handle sales field that might not exist */}
            <p className="text-gray-600">
              <strong>Sales:</strong>{" "}
              {client.sales ? client.sales.toLocaleString() : "0"} Frw
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Contact Information
            </h2>
            <p className="text-gray-600">
              <strong>Email:</strong> {client.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {client.phone}
            </p>
            <p className="text-gray-600">
              <strong>Bank Account:</strong> {client.bankAccount}
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Address</h2>
            <p className="text-gray-600">
              <strong>Province:</strong> {client.address?.province || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>District:</strong> {client.address?.district || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Sector:</strong> {client.address?.sector || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Cell:</strong> {client.address?.cell || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReport;
