import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const user = await login(
  formData.email,
  formData.password
);

if (user.role === "customer") {
  navigate("/store");

} else if (
  user.role === "admin"
) {
  navigate("/admin");

} else {
  navigate("/dashboard");
}
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          RingRing CRM
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Smart Calling & Lead Management
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "#3b82f6",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#cbd5e1",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;