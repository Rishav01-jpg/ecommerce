import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "COD",
  });

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

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity,
    0
  );

  // Place Order
  const handlePlaceOrder = async () => {
    try {
      // Validation
      if (
        !formData.address ||
        !formData.city ||
        !formData.postalCode ||
        !formData.country
      ) {
        return alert(
          "Please fill all shipping details"
        );
      }

      // =========================
      // UPI / RAZORPAY PAYMENT
      // =========================
      if (formData.paymentMethod === "UPI") {
        const { data } = await API.post(
          "/payment/create-order",
          {
            amount: totalPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        );

        const options = {
          key: import.meta.env
            .VITE_RAZORPAY_KEY_ID,

          amount: data.order.amount,

          currency: "INR",

          name: "RingRing Store",

          description: "Order Payment",

          order_id: data.order.id,

          handler: async function (
            response
          ) {
            try {
              await API.post(
                "/orders",
                {
                  shippingAddress: {
                    address:
                      formData.address,
                    city: formData.city,
                    postalCode:
                      formData.postalCode,
                    country:
                      formData.country,
                  },

                  paymentMethod:
                    formData.paymentMethod,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "token"
                    )}`,
                  },
                }
              );

              alert(
                "Payment successful & Order placed 🚀"
              );

              navigate("/my-orders");
            } catch (error) {
              console.log(error);

              alert(
                "Order creation failed"
              );
            }
          },

          prefill: {
            name: "Customer",
            email:
              "customer@gmail.com",
          },

          theme: {
            color: "#2563eb",
          },
        };

        const razor =
          new window.Razorpay(options);

        razor.open();

        return;
      }

      // =========================
      // COD ORDER
      // =========================
      await API.post(
        "/orders",
        {
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            postalCode:
              formData.postalCode,
            country: formData.country,
          },

          paymentMethod:
            formData.paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      alert("Order placed successfully 🚀");

      navigate("/my-orders");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Order failed"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <h1 className="text-white text-3xl p-10">
        Loading Checkout...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side */}
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-8 border border-gray-800">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Checkout 🚀
          </h1>

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 mb-6"
          />

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 mb-6"
          />

          {/* Postal Code */}
          <input
            type="text"
            name="postalCode"
            placeholder="Enter Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 mb-6"
          />

          {/* Country */}
          <input
            type="text"
            name="country"
            placeholder="Enter Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 mb-6"
          />

          {/* Payment Method */}
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full bg-black text-white border border-gray-700 rounded-xl px-4 py-4"
          >
            <option
              value="COD"
              className="bg-black text-white"
            >
              Cash On Delivery
            </option>

            <option
              value="UPI"
              className="bg-black text-white"
            >
              UPI / Razorpay
            </option>
          </select>

        </div>

        {/* Right Side */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 h-fit">

          <h2 className="text-3xl font-bold mb-8">
            Order Summary
          </h2>

          {/* Products */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 mb-6"
            >

              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-bold">
                  {item.product.name}
                </h3>

                <p className="text-gray-400">
                  Qty: {item.quantity}
                </p>

                <p className="text-blue-500 font-bold">
                  ₹
                  {item.product.price *
                    item.quantity}
                </p>
              </div>

            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between text-2xl font-bold mt-10 border-t border-gray-700 pt-6">
            <span>Total</span>

            <span className="text-blue-500">
              ₹{totalPrice}
            </span>
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-xl font-bold mt-8 transition"
          >
            {formData.paymentMethod === "UPI"
              ? "Pay Now"
              : "Place Order"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;