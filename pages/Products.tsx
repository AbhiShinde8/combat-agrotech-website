import React, { useState, useEffect } from "react";
import { api } from "../services/mockBackend";
import { Product } from "../types";
import { Filter, Loader } from "lucide-react";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.products.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", "Fertilizer", "Raw Material", "Growth Promoter"];

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-12 w-12 text-combat-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-500 mt-1">
              High-grade inputs for better yield.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filter === cat
                      ? "bg-combat-green text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden relative group">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-combat-darkGreen">
                    {product.category}
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto w-full bg-gray-900 text-white py-2 rounded-md hover:bg-combat-green transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-combat-yellow bg-combat-darkGreen px-2 py-1 rounded uppercase tracking-wider">
                        {selectedProduct.category}
                      </span>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                      >
                        &times;
                      </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="mt-6 border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Specifications
                      </h4>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Industrial Grade Standard</li>
                        <li>• High Solubility</li>
                        <li>• Bulk Packaging Available</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/dealer-enquiry"
                      className="block w-full bg-combat-yellow text-combat-darkGreen font-bold text-center py-3 rounded-lg hover:bg-yellow-400 transition"
                    >
                      Enquire Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
