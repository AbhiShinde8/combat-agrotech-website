import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
// import { api } from '../services/mockBackend';

const Contact: React.FC = () => {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await api.contact.submit(msg);
  //   setSubmitted(true);
  //   setMsg({ name: "", email: "", phone: "", message: "" });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(
      "https://script.google.com/macros/s/AKfycbwM3RgexAnwwTdT_Oaask4Q97JvUa1z9zgJyu903HwGzaP4tfYHW1q-yJw_ckL5cM3b/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(msg),
      }
    );

    setSubmitted(true);
    setMsg({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Get in Touch
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-6 text-combat-darkGreen">
                Head Office
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-combat-yellow mt-1 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Combat Agrotech Pvt. Ltd.
                    </p>
                    <p className="text-gray-600">
                      Industrial Area, Pune, Maharashtra, India - 411001
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-combat-yellow mr-4" />
                  <p className="text-gray-600">+91 7218850033</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-combat-yellow mr-4" />
                  <p className="text-gray-600">combatagrotech@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-xl h-64 w-full flex items-center justify-center text-gray-500 shadow-inner">
              <span className="flex items-center">
                <MapPin className="mr-2" /> Google Map Placeholder
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-6 text-combat-darkGreen">
              Send us a Message
            </h3>
            {submitted ? (
              <div className="text-center py-12 bg-green-50 rounded-lg border border-green-200">
                <h4 className="text-green-800 font-bold mb-2">Message Sent!</h4>
                <p className="text-green-600">
                  Thank you for contacting Combat Agrotech.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-green-800 underline"
                >
                  Send new message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={msg.name}
                    onChange={(e) => setMsg({ ...msg, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={msg.email}
                    onChange={(e) => setMsg({ ...msg, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={msg.phone}
                    onChange={(e) => setMsg({ ...msg, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={msg.message}
                    onChange={(e) =>
                      setMsg({ ...msg, message: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-combat-green focus:outline-none focus:ring-1 focus:ring-combat-green"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-combat-darkGreen text-white py-3 rounded-md hover:bg-green-900 transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
