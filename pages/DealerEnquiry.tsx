import React, { useState } from "react";
import { api } from "../services/mockBackend";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const DealerEnquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    dealerName: "",
    companyName: "",
    location: "",
    phone: "",
    email: "",
    productInterest: "General",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus('submitting');
  //   try {
  //     await api.enquiries.submit(formData);
  //     setStatus('success');
  //     setFormData({ dealerName: '', companyName: '', location: '', phone: '', email: '', productInterest: 'General' });
  //   } catch (err) {
  //     setStatus('error');
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch(
        " https://script.google.com/macros/s/AKfycbypY8avqgCfXCSKv-by0oKQChF4Ybk2SqzfPXa8DjuMe5ajkfjAjzKeR0WX30DnmGloPQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setStatus("success");
      setFormData({
        dealerName: "",
        companyName: "",
        location: "",
        phone: "",
        email: "",
        productInterest: "General",
      });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-combat-darkGreen py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Dealer Enquiry Form</h2>
          <p className="text-green-100 mt-2">
            Partner with Combat Agrotech and grow your business.
          </p>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">
                Enquiry Submitted!
              </h3>
              <p className="text-gray-600 mt-2">
                Our sales team will contact you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-combat-green font-semibold hover:underline"
              >
                Send another enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dealer Name
                  </label>
                  <input
                    required
                    name="dealerName"
                    value={formData.dealerName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location (City, State)
                </label>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Interest
                </label>
                <select
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                >
                  <option value="General">General Partnership</option>
                  <option value="Fertilizers">Finished Fertilizers</option>
                  <option value="Raw Material">Raw Materials</option>
                  <option value="Consulting">Production Consulting</option>
                </select>
              </div>

              {status === "error" && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Submission failed. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-combat-yellow text-combat-darkGreen font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealerEnquiry;
