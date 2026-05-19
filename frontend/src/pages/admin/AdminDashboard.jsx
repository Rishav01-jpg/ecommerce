import { Link } from "react-router-dom";

import {
  ShoppingBag,
  Package,
  Users,
  IndianRupee,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import API from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: 0,
    });

  const [loading, setLoading] =
    useState(true);

  // Fetch Dashboard Stats
  const fetchStats =
    async () => {
      try {
        const { data } =
          await API.get(
            "/admin/stats",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          );

        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <h1 className="text-white text-3xl p-10">
        Loading Dashboard...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <div className="w-72 bg-gray-950 border-r border-gray-800 p-6">

        <h1 className="text-3xl font-bold text-blue-500 mb-10">
          Admin Panel 🚀
        </h1>

        <div className="space-y-4">

          <Link
            to="/admin"
            className="block bg-blue-500 hover:bg-blue-600 px-5 py-4 rounded-xl transition font-bold"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="block bg-gray-900 hover:bg-gray-800 px-5 py-4 rounded-xl transition"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="block bg-gray-900 hover:bg-gray-800 px-5 py-4 rounded-xl transition"
          >
            Orders
          </Link>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-500">
            Dashboard 🚀
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Welcome to your futuristic admin dashboard.
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {/* Products */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-gray-400 text-lg">
                  Total Products
                </h2>

                <h1 className="text-4xl font-bold mt-3">
                  {stats.totalProducts}
                </h1>
              </div>

              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <ShoppingBag
                  size={40}
                  className="text-blue-500"
                />
              </div>

            </div>

          </div>

          {/* Orders */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-gray-400 text-lg">
                  Total Orders
                </h2>

                <h1 className="text-4xl font-bold mt-3">
                  {stats.totalOrders}
                </h1>
              </div>

              <div className="bg-green-500/20 p-4 rounded-2xl">
                <Package
                  size={40}
                  className="text-green-500"
                />
              </div>

            </div>

          </div>

          {/* Customers */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-gray-400 text-lg">
                  Customers
                </h2>

                <h1 className="text-4xl font-bold mt-3">
                  {stats.totalCustomers}
                </h1>
              </div>

              <div className="bg-purple-500/20 p-4 rounded-2xl">
                <Users
                  size={40}
                  className="text-purple-500"
                />
              </div>

            </div>

          </div>

          {/* Revenue */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-yellow-500 transition">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-gray-400 text-lg">
                  Revenue
                </h2>

                <h1 className="text-4xl font-bold mt-3">
                  ₹{stats.totalRevenue}
                </h1>
              </div>

              <div className="bg-yellow-500/20 p-4 rounded-2xl">
                <IndianRupee
                  size={40}
                  className="text-yellow-500"
                />
              </div>

            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="space-y-6">

            <div className="bg-black border border-gray-800 rounded-xl p-5 flex justify-between items-center">

              <div>
                <h3 className="font-bold text-lg">
                  Live Orders
                </h3>

                <p className="text-gray-400">
                  Total Orders:
                  {" "}
                  {stats.totalOrders}
                </p>
              </div>

              <span className="bg-green-500/20 text-green-500 px-4 py-2 rounded-xl">
                Active
              </span>

            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-5 flex justify-between items-center">

              <div>
                <h3 className="font-bold text-lg">
                  Store Products
                </h3>

                <p className="text-gray-400">
                  Total Products:
                  {" "}
                  {stats.totalProducts}
                </p>
              </div>

              <span className="bg-blue-500/20 text-blue-500 px-4 py-2 rounded-xl">
                Updated
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;