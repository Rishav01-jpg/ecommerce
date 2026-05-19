import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(
        `/products/${id}`
      );

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <h1 className="text-white text-3xl p-10">
        Loading...
      </h1>
    );
  }
const handleAddToCart = async () => {
  try {
    await API.post(
      "/cart",
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    alert("Product added to cart 🚀");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
        "Failed to add cart"
    );
  }
};
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl border border-gray-800"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-400 mt-6 text-lg">
            {product.description}
          </p>

          <h2 className="text-4xl text-blue-500 font-bold mt-8">
            ₹{product.price}
          </h2>

          <div className="mt-6 space-y-2">
            <p>
              <span className="font-bold">
                Category:
              </span>{" "}
              {product.category}
            </p>

            <p>
              <span className="font-bold">
                Brand:
              </span>{" "}
              {product.brand}
            </p>

            <p>
              <span className="font-bold">
                Stock:
              </span>{" "}
              {product.stock}
            </p>
          </div>

         <button
  onClick={handleAddToCart}
  className="mt-10 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-xl font-bold transition"
>
  Add To Cart
</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;