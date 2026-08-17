import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "./NavBar.css";
import { productsDatabase } from "../../../data/Products.js";
import { getProductsFromStorage } from "../../../utils/ProductsStorage";

const getCurrentUserRole = () => {
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

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [showPromo, setShowPromo] = useState(true);
  const isAdmin = getCurrentUserRole() === "admin";

  const fetchData = (value) => {
    const storedProducts = getProductsFromStorage();
    const products = storedProducts.length ? storedProducts : productsDatabase;
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()),
    );
    return filteredProducts;
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setInput(value);
    setIsSearchOpen(true);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchResults(fetchData(value));
  };
  const scrollToSection = (event, id) => {
    event.preventDefault();
    setIsOpen(false);
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `/#${id}`);
      }
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 80);
    } else {
      doScroll();
    }
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(`/Category/${selectedValue}`);
      setIsOpen(false);
    }
  };
  const menu = () => {
    setIsOpen(!isOpen);
  };

  const getCategoryLabel = () => {
    const match = location.pathname.match(/\/Category\/(.+)/);
    if (!match) return "";
    const key = match[1];
    return key
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  };
  const currentCategoryLabel = getCategoryLabel();

  return (
    <nav className="navbar">
      {showPromo && (
        <div className="navbar-parag">
          <p>
            Sign up and get 20% off to your first order.
            <NavLink to="/register" className="navbar-link">
              {" "}
              Sign Up Now
            </NavLink>
          </p>
          <button className="exit-button" onClick={() => setShowPromo(false)}>
            X
          </button>
        </div>
      )}

      <div className="navbar-header">
        <div className="navbar-boss">
          <div className="navbar-logo-menu">
            <img
              className="navbar-resbon"
              onClick={menu}
              src="/images/Frame (2).png"
              alt=""
            />
            <h1 className="navbar-logo">SHOP.CO</h1>
          </div>
          <ul className={`navbar-list ${isOpen ? "active" : ""}`}>
            <li>
              <label htmlFor="options"> Shop </label>
              <select
                id="options"
                onChange={handleSelectChange}
                defaultValue=""
              >
                <optgroup label="Men">
                  <option value="" className="navbar-default"></option>
                  <option value="T-SHIRT">T-shirt</option>
                  <option value="JEANS">Jeans</option>
                  <option value="SHIRT">Shirt</option>
                  <option value="SHORTS">Shorts</option>
                </optgroup>
                <optgroup label="Women">
                  <option value="T-SHIRT">T-shirt</option>
                  <option value="JEANS">Jeans</option>
                  <option value="SHIRT">Shirt</option>
                  <option value="SHORTS">Shorts</option>
                </optgroup>
              </select>
            </li>
            <li>
              <a
                href="/#top-selling"
                onClick={(e) => scrollToSection(e, "top-selling")}
              >
                {" "}
                Top Selling{" "}
              </a>
            </li>
            <li>
              <a
                href="/#new-arrival"
                onClick={(e) => scrollToSection(e, "new-arrival")}
              >
                {" "}
                New Arrivals{" "}
              </a>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <NavLink to="/Category">Category</NavLink>
            </li>
            {isAdmin && (
              <li
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
          <div
            className={`navbar-searchbox  ${isSearchOpen ? "search-active" : ""}`}
          >
            <img src="/images/Frame.png" alt="search" />
            <input
              type="text"
              className="navbar-search"
              placeholder="Search for products..."
              value={input}
              onFocus={() => setIsSearchOpen(true)}
              onChange={handleSearchChange}
            />
            {isSearchOpen && (
              <span
                className="search-close-btn"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchResults([]);
                  setInput("");
                }}
              >
                x
              </span>
            )}
          </div>
          {(isSearchOpen || input.trim()) && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => {
                    navigate(`/productdetail?id=${product.id}`);
                    setInput("");
                    setSearchResults([]);
                    setIsSearchOpen(false);
                  }}
                >
                  {product.name}
                </button>
              ))}
            </div>
          )}
          <div className="navbar-icon">
            {!isSearchOpen && (
              <img
                src="/images/Frame (3).png"
                alt="open search"
                className="search-img"
                onClick={() => setIsSearchOpen(true)}
              />
            )}
            <NavLink to="/cart">
              <img src="/images/Frame (1).png" alt="cart" />
            </NavLink>
            <NavLink to="/login">
              <img src="/images/Vector.png" alt="profile" />
            </NavLink>{" "}
          </div>
        </div>
      </div>
      {currentCategoryLabel && (
        <div className="navbar-direction">
          <p>
            <a href="/">Home</a> <span className="sep">/</span> Shop{" "}
            <span className="sep">/</span> {currentCategoryLabel}
          </p>
        </div>
      )}
      <span className="navbar-line"></span>
    </nav>
  );
};

export default NavBar;
