import { saveProductToStorage } from "./utils/ProductsStorage";
import { useEffect } from "react";
import { productsDatabase } from "./data/Products";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import Category from "./Pages/Category";
import Cart from "./Pages/Cart";
import Dashboard from "./Pages/Dashboard";
import NavBar from "./Components/SharedComponents/NavBar/NavBar";
import Footer from "./Components/SharedComponents/Footer/Footer";
// ---------------------------------
import { CartProvider } from "./Components/SharedComponents/CartContext/CartContext";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

const getUserRole = () => {
  try {
    const storedUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null",
    );
    if (!storedUser) return "guest";

    const type = String(storedUser.type ?? "").toLowerCase();
    return type === "admin" || type === "administrator" || type === "1"
      ? "admin"
      : "user";
  } catch {
    return "guest";
  }
};

function App() {
  const location = useLocation();
  const currentRole = getUserRole();
  const isAdmin = currentRole === "admin";
  const isLoggedIn = currentRole !== "guest";
  const isAuthPage = ["/login", "/register", "/accounts"].includes(
    location.pathname,
  );

  useEffect(() => {
    saveProductToStorage(productsDatabase);
  }, []);

  return (
    <>
      <NavBar />
      <CartProvider>
        {isAuthPage ? (
          <div className="auth-overlay">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/accounts"
                element={<Navigate to="/register" replace />}
              />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/dashboard"
              element={
                isAdmin ? (
                  <Dashboard />
                ) : (
                  <Navigate to={isLoggedIn ? "/" : "/login"} replace />
                )
              }
            />
          </Routes>
        )}
      </CartProvider>
      <Footer />
    </>
  );
}

export default App;
