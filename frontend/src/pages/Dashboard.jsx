import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">
          ECommerce Store
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">
            Dashboard 🚀
          </h1>

          <div className="space-y-6">
            <div className="bg-black p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-sm">
                Welcome
              </p>

              <h2 className="text-2xl font-semibold">
                {user?.name}
              </h2>
            </div>

            <div className="bg-black p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-sm">
                Role
              </p>

              <h3 className="text-xl text-green-400">
                {user?.role}
              </h3>
            </div>

            <div className="bg-black p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-sm">
                Email
              </p>

              <h3 className="text-lg break-words">
                {user?.email}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;