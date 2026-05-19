import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500 transition hover:scale-105 duration-300">
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-5">
          <h2 className="text-2xl font-bold">
            {product.name}
          </h2>

          <p className="text-gray-400 mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-bold text-blue-500">
              ₹{product.price}
            </span>

            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;