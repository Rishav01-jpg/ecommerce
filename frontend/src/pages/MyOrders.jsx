import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const { data } = await API.get(
        "/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-3xl">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-blue-500 mb-10">
          My Orders 📦
        </h1>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800 text-center">
            <h2 className="text-3xl text-gray-400">
              No Orders Yet
            </h2>
          </div>
        ) : (
          <div className="space-y-10">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
              >

                {/* Order Header */}
                <div className="p-6 border-b border-gray-800 bg-gray-950">

                  <h2 className="text-xl font-bold break-all">
                    Order ID: {order._id}
                  </h2>

                  <div className="flex flex-wrap gap-6 mt-5">

                    <div>
                      <p className="text-gray-400 text-sm">
                        Order Status
                      </p>

                      <span className="bg-blue-500 px-4 py-2 rounded-lg inline-block mt-2 font-bold">
                        {order.orderStatus}
                      </span>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        Payment Status
                      </p>

                      <span className="bg-green-500 px-4 py-2 rounded-lg inline-block mt-2 font-bold">
                        {order.paymentStatus}
                      </span>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        Total Amount
                      </p>

                      <h3 className="text-3xl font-bold text-blue-500 mt-2">
                        ₹{order.totalAmount}
                      </h3>
                    </div>

                  </div>
                </div>

                {/* Ordered Products */}
                <div className="p-6 space-y-6">

                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row gap-6 bg-black rounded-2xl p-5 border border-gray-800"
                    >

                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full md:w-44 h-44 object-cover rounded-xl"
                      />

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-center">

                        <h2 className="text-3xl font-bold">
                          {item.product.name}
                        </h2>

                        <p className="text-gray-400 mt-3 text-lg">
                          {item.product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mt-6">

                          <h3 className="text-3xl font-bold text-blue-500">
                            ₹{item.product.price}
                          </h3>

                          <span className="bg-gray-800 px-4 py-2 rounded-lg text-lg">
                            Qty: {item.quantity}
                          </span>

                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;