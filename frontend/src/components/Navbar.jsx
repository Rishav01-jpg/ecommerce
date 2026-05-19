import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/store"
          className="text-3xl font-bold text-blue-500"
        >
          ECommerce
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link
            to="/store"
            className="text-white hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="text-white hover:text-blue-400 transition"
          >
            Cart
          </Link>

          <Link
            to="/my-orders"
            className="text-white hover:text-blue-400 transition"
          >
            Orders
          </Link>

          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;