import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });

      setCartItems(data.cartItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Quantity
  const updateQuantity = async (
    cartId,
    quantity
  ) => {
    try {
      await API.put(
        `/cart/${cartId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeItem = async (cartId) => {
    try {
      await API.delete(`/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity,
    0
  );

  // Loading
  if (loading) {
    return (
      <h1 className="text-white text-3xl p-10">
        Loading Cart...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold text-blue-500 mb-10">
          My Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          <h2 className="text-2xl text-gray-400">
            Cart is empty
          </h2>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900 rounded-2xl p-5 flex flex-col md:flex-row gap-5 border border-gray-800"
                >

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full md:w-40 h-40 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {item.product.description}
                    </p>

                    <h3 className="text-blue-500 text-2xl font-bold mt-4">
                      ₹{item.product.price}
                    </h3>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1
                          )
                        }
                        disabled={
                          item.quantity <= 1
                        }
                        className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-lg text-xl"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1
                          )
                        }
                        className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-lg text-xl"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeItem(item._id)
                        }
                        className="ml-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 h-fit">

              <h2 className="text-3xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-xl mb-4">
                <span>Total Items</span>

                <span>
                  {cartItems.length}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>Total</span>

                <span className="text-blue-500">
                  ₹{totalPrice}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-xl font-bold transition"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;