import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-blue-500">
            Explore Products 🚀
          </h1>

          <p className="text-gray-400 mt-4">
            Discover futuristic products with modern shopping experience.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading ? (
            <h1 className="text-white text-2xl">
              Loading products...
            </h1>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Store;