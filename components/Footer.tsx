import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">COMBAT AGROTECH</h3>
            <p className="text-sm leading-relaxed mb-4">
              Leading the way in fertilizer manufacturing and agricultural solutions. 
              Committed to quality, growth, and the prosperity of Indian farmers.
            </p>
            <div className="flex space-x-4">
                <span className="w-2 h-2 rounded-full bg-combat-yellow"></span>
                <span className="w-2 h-2 rounded-full bg-combat-green"></span>
                <span className="w-2 h-2 rounded-full bg-combat-red"></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-combat-yellow transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-combat-yellow transition">Our Products</Link></li>
              <li><Link to="/process" className="hover:text-combat-yellow transition">Manufacturing Process</Link></li>
              <li><Link to="/dealer-enquiry" className="hover:text-combat-yellow transition">Become a Dealer</Link></li>
              <li><Link to="/admin" className="hover:text-combat-yellow transition">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-combat-yellow shrink-0" />
                <span>Pune, Maharashtra, India.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-combat-yellow shrink-0" />
                <span>+91 7218850033</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-combat-yellow shrink-0" />
                <span>combatagrotech@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Combat Agrotech Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;