import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axois";
import { toast } from "react-toastify";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    representative: "",
    dateOfCreation: "",
    address: {
      province: "",
      district: "",
      sector: "",
      cell: "",
    },
    email: "",
    phone: "",
    bankAccount: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchClient = async () => {
      try {
        const res = await axios.get(`/api/clients/${id}`);
        const client = res.data;

        // Format date for input type="month"
        const date = new Date(client.dateOfCreation);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;

        setFormData({
          name: client.name || "",
          category: client.category || "",
          representative: client.representative || "",
          dateOfCreation: formattedDate || "",
          address: {
            province: client.Address?.province || "",
            district: client.Address?.district || "",
            sector: client.Address?.sector || "",
            cell: client.Address?.cell || "",
          },
          email: client.email || "",
          phone: client.phone || "",
          bankAccount: client.bankAccount || "",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load client for editing"
        );
        navigate("/clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        category: formData.category,
        representative: formData.representative,
        dateOfCreation: new Date(formData.dateOfCreation + "-01"),
        address: { ...formData.address },
        email: formData.email,
        phone: formData.phone,
        bankAccount: formData.bankAccount,
        sale: 0,
        StartDate: new Date(),
        endDate: { isActive: true },
        totalRevenue: 0,
      };

      if (id) {
        await axios.put(`/api/clients/${id}`, submitData);
        toast.success("Client updated successfully!");
      } else {
        await axios.post("/api/clients", submitData);
        toast.success("Client added successfully!");
      }

      navigate("/Clients");
    } catch (error) {
      console.error("Submit error:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        `Failed to ${id ? "update" : "add"} client`;
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">
          {id ? "Edit Client" : "Add New Client"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Choose Category</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Hotel">Hotel</option>
              <option value="Pub">Pub</option>
              <option value="Coffeeshop">Coffeeshop</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Representative */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Representative
            </label>
            <input
              type="text"
              name="representative"
              value={formData.representative}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Creation (Month & Year)
            </label>
            <input
              type="month"
              name="dateOfCreation"
              value={formData.dateOfCreation}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Address */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-base font-medium text-gray-900">Address</legend>
            <div className="mt-4 space-y-4">
              {["province", "district", "sector", "cell"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={`address.${field}`}
                    value={formData.address[field]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Account (IBAN)</label>
            <input
              type="text"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : id ? "Update Client" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
