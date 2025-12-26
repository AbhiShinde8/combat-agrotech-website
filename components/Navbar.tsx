import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Tractor } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Process", path: "/process" },
    { name: "Dealer Enquiry", path: "/dealer-enquiry" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-combat-darkGreen text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <Tractor className="h-8 w-8 text-combat-yellow" /> */}
            <img
              src="/images/Logo1.png"
              alt=""
              srcset=""
              className="h-10 w-10 text-combat-yellow"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight tracking-wide">
                COMBAT
              </span>
              <span className="text-xs text-combat-yellow uppercase tracking-widest">
                Agrotech Pvt. Ltd.
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "bg-combat-yellow text-combat-darkGreen"
                      : "hover:bg-white/10 text-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    to="/admin"
                    className="text-combat-yellow hover:text-yellow-300 font-bold"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin"
                  className="text-gray-400 hover:text-white text-xs ml-4"
                >
                  Abhijit shinde
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-combat-darkGreen border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-combat-yellow text-combat-darkGreen"
                    : "text-gray-200 hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-combat-yellow"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
