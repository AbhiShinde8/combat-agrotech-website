import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Truck } from "lucide-react";
import { api } from "../services/mockBackend";

const About: React.FC = () => {
  const [content, setContent] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    api.content.getAll().then((items) => {
      const map = items.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as any);
      setContent(map);
    });
  }, []);

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <div className="bg-gray-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-combat-darkGreen mb-4"
          >
            About Combat Agrotech
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Driving the future of agriculture through innovation, quality
            manufacturing, and unwavering commitment to farmers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Combat Agrotech Pvt. Ltd., based in Pune, India, was founded with
              a singular vision: to combat the challenges of modern agriculture
              with superior nutritional solutions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We started as a small manufacturing unit and have grown into a
              comprehensive agrotech company. We specialize in both the
              synthesis of raw chemical materials and the formulation of final
              fertilizer products used by thousands of farmers across the
              region.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 md:h-auto overflow-hidden">
            <img
              src="/images/logo.jpg"
              alt="Fields"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-combat-darkGreen text-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-combat-yellow">
              Our Vision
            </h3>
            <p className="text-gray-200">
              {content["about_vision"] ||
                "To be India's most trusted partner in sustainable agriculture, providing world-class fertilizers that ensure food security and economic prosperity for farmers."}
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-combat-darkGreen">
              Our Mission
            </h3>
            <p className="text-gray-600">
              {content["about_mission"] ||
                "To manufacture high-quality, cost-effective agricultural inputs through state-of-the-art technology and rigorous quality control, while maintaining a transparent and supportive dealer network."}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-combat-yellow" />
            </div>
            <h3 className="text-lg font-bold mb-2">Quality Assurance</h3>
            <p className="text-gray-600 text-sm">
              Every batch undergoes strict lab testing to meet global standards.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-combat-green" />
            </div>
            <h3 className="text-lg font-bold mb-2">Compliance</h3>
            <p className="text-gray-600 text-sm">
              Fully licensed and compliant with Indian government agricultural
              regulations.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-combat-red" />
            </div>
            <h3 className="text-lg font-bold mb-2">Robust Logistics</h3>
            <p className="text-gray-600 text-sm">
              Efficient supply chain ensuring timely delivery to dealers and
              distributors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
