import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/mockBackend';
import { ProcessStep } from '../types';
import { renderIcon } from '../utils/icons';

const Process: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  useEffect(() => {
    api.process.getAll().then(setSteps);
  }, []);

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-combat-darkGreen">Manufacturing Process</h1>
          <p className="mt-4 text-gray-600">A timeline of quality and precision.</p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full md:w-1/2 p-6">
                  <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${step.colorClass.replace('bg-', 'border-')}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div className="z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0 my-4 md:my-0 shrink-0 relative bg-gray-100">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${step.colorClass}`}>
                    {renderIcon(step.icon, { className: "h-6 w-6" })}
                  </div>
                </div>

                <div className="flex-1 w-full md:w-1/2 p-6 hidden md:block">
                  {/* Empty space for alignment */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;