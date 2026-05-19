import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const { data } = await API.get(
       "/orders" ,
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

  // Update Status
  const updateOrderStatus = async (
    orderId,
    orderStatus
  ) => {
    try {
      await API.put(
        `/orders/${orderId}`,
        { orderStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      alert(
        "Order status updated 🚀"
      );

      fetchOrders();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

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
            className="block bg-gray-900 hover:bg-gray-800 px-5 py-4 rounded-xl transition"
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
            className="block bg-blue-500 hover:bg-blue-600 px-5 py-4 rounded-xl transition font-bold"
          >
            Orders
          </Link>

        </div>

      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-blue-500 mb-10">
          Customer Orders 🚀
        </h1>

        {loading ? (
          <h1 className="text-2xl">
            Loading Orders...
          </h1>
        ) : orders.length === 0 ? (
          <h2 className="text-2xl text-gray-400">
            No orders found
          </h2>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
              >

                {/* Top */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Order ID:
                    </h2>

                    <p className="text-gray-400 break-all">
                      {order._id}
                    </p>

                    <h3 className="mt-4 text-lg">
                      Customer:
                      {" "}
                      <span className="text-blue-500">
                        {order.user?.name}
                      </span>
                    </h3>

                    <p className="text-gray-400">
                      {order.user?.email}
                    </p>

                  </div>

                  <div className="text-right">

                    <h2 className="text-3xl font-bold text-blue-500">
                      ₹{order.totalAmount}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Payment:
                      {" "}
                      {order.paymentMethod}
                    </p>

                    <p className="text-gray-400">
                      Payment Status:
                      {" "}
                      {order.paymentStatus}
                    </p>

                  </div>

                </div>

                {/* Shipping */}
                <div className="bg-black border border-gray-800 rounded-xl p-5 mb-8">

                  <h2 className="text-2xl font-bold mb-4">
                    Shipping Address
                  </h2>

                  <p>
                    {
                      order.shippingAddress
                        ?.address
                    }
                  </p>

                  <p>
                    {
                      order.shippingAddress
                        ?.city
                    }
                  </p>

                  <p>
                    {
                      order.shippingAddress
                        ?.postalCode
                    }
                  </p>

                  <p>
                    {
                      order.shippingAddress
                        ?.country
                    }
                  </p>

                </div>

                {/* Products */}
                <div className="space-y-6">

                  <h2 className="text-2xl font-bold">
                    Ordered Products
                  </h2>

                  {order.orderItems.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-5 bg-black border border-gray-800 rounded-xl p-5"
                      >

                        <img
                          src={
                            item.product
                              ?.image
                          }
                          alt={
                            item.product
                              ?.name
                          }
                          className="w-24 h-24 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="text-xl font-bold">
                            {
                              item.product
                                ?.name
                            }
                          </h3>

                          <p className="text-gray-400">
                            Qty:
                            {" "}
                            {
                              item.quantity
                            }
                          </p>

                          <p className="text-blue-500 font-bold mt-2">
                            ₹
                            {
                              item.product
                                ?.price
                            }
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

                {/* Status */}
                <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Current Status:
                    </h2>

                    <span className="inline-block mt-3 bg-blue-500/20 text-blue-500 px-5 py-2 rounded-xl">
                      {order.orderStatus}
                    </span>

                  </div>

                  {/* Update Status */}
                  <div className="flex flex-wrap gap-4">

                    <button
                      onClick={() =>
                        updateOrderStatus(
                          order._id,
                          "processing"
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 rounded-xl font-bold"
                    >
                      Processing
                    </button>

                    <button
                      onClick={() =>
                        updateOrderStatus(
                          order._id,
                          "shipped"
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold"
                    >
                      Shipped
                    </button>

                    <button
                      onClick={() =>
                        updateOrderStatus(
                          order._id,
                          "delivered"
                        )
                      }
                      className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
                    >
                      Delivered
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrders;