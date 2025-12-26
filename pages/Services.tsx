import React, { useEffect, useState } from 'react';
import { api } from '../services/mockBackend';
import { Service } from '../types';
import { renderIcon } from '../utils/icons';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  
  useEffect(() => {
    api.services.getAll().then(setServices);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-xl text-gray-600">Comprehensive solutions for the agricultural industry.</p>
        </div>

        <div className="space-y-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className={`${service.colorClass} md:w-1/4 p-8 flex items-center justify-center`}>
                <div className="text-white">
                  {renderIcon(service.icon, { className: "h-16 w-16" })}
                </div>
              </div>
              <div className="p-8 md:w-3/4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">The Process</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {service.processSteps?.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Business Value</h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {service.valueProp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;