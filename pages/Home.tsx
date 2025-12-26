import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { api } from "../services/mockBackend";
import { Service, ContentItem } from "../types";
import { renderIcon } from "../utils/icons";

const Home: React.FC = () => {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [contentData, servicesData] = await Promise.all([
        api.content.getAll(),
        api.services.getAll(),
      ]);

      const contentMap = contentData.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as { [key: string]: string });

      setContent(contentMap);
      setServices(servicesData.slice(0, 3)); // Only show first 3
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-combat-darkGreen overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="/images/allProduct.png"
          alt="Agriculture Field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {content["home_hero_title"] ||
              "Empowering Agriculture with Quality Fertilizers"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8"
          >
            {content["home_hero_subtitle"] ||
              "Combat Agrotech delivers premium manufacturing solutions."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="bg-combat-yellow text-combat-darkGreen font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-transform transform hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              to="/dealer-enquiry"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-combat-darkGreen transition-colors"
            >
              Become a Dealer
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Snapshot About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {content["home_about_title"] || "Growing Trust"}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {content["home_about_text"] ||
                  "Located in Pune, Combat Agrotech Pvt. Ltd. stands as a pillar of reliability..."}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "ISO Certified Processes",
                  "Premium Raw Materials",
                  "Expert Consultation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <CheckCircle className="h-5 w-5 text-combat-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="text-combat-darkGreen font-semibold flex items-center hover:text-combat-green"
              >
                Learn more about us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/Hero1.png"
                alt="Laboratory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-combat-green font-bold uppercase tracking-wider text-sm">
              What We Do
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Our Core Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-gray-300`}
              >
                <div className="mb-4 text-combat-darkGreen h-10 w-10">
                  {renderIcon(service.icon, { className: "h-10 w-10" })}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="text-combat-yellow font-medium hover:underline"
                >
                  Details &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-combat-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {content["home_cta_title"] || "Ready to Boost Agricultural Yields?"}
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Partner with Combat Agrotech for reliable supply and expert
            consultation. Let's grow together.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-combat-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
