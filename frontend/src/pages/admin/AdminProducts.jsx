import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });

  const [image, setImage] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    try {
     const { data } = await API.get(
  "/products/my-products",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  }
);

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

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Upload Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData =
        new FormData();

      productData.append(
        "name",
        formData.name
      );

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "price",
        formData.price
      );

      productData.append(
        "stock",
        formData.stock
      );

      productData.append(
        "category",
        formData.category
      );

      productData.append(
        "brand",
        formData.brand
      );

      productData.append(
        "image",
        image
      );

      await API.post(
        "/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Product uploaded successfully 🚀"
      );

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
      });

      setImage(null);

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Upload failed"
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
            className="block bg-blue-500 hover:bg-blue-600 px-5 py-4 rounded-xl transition font-bold"
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

      {/* Main */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-blue-500 mb-10">
          Product Management 🚀
        </h1>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-12"
        >

          <h2 className="text-3xl font-bold mb-8">
            Upload Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-black border border-gray-700 rounded-xl px-4 py-4"
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="bg-black border border-gray-700 rounded-xl px-4 py-4"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="bg-black border border-gray-700 rounded-xl px-4 py-4"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="bg-black border border-gray-700 rounded-xl px-4 py-4"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="bg-black border border-gray-700 rounded-xl px-4 py-4"
            />

            <input
              type="file"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              className="bg-black border border-gray-700 rounded-xl px-4 py-4"
            />

          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-4 mt-6"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-xl font-bold mt-8 transition"
          >
            Upload Product
          </button>

        </form>

        {/* Products */}
        <div>

          <h2 className="text-4xl font-bold mb-8">
            All Products
          </h2>

          {loading ? (
            <h1 className="text-2xl">
              Loading...
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
                >

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

                    <div className="flex justify-between items-center mt-6">

                      <span className="text-blue-500 text-2xl font-bold">
                        ₹{product.price}
                      </span>

                      <span className="bg-gray-800 px-4 py-2 rounded-lg">
                        Stock:
                        {" "}
                        {product.stock}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminProducts;