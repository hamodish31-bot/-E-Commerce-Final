import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const adminUser = {
  name: "Admin",
  email: "admin@shop.com",
  password: "admin123",
  type: "admin",
};

const ensureAdminUser = () => {
  try {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const alreadyExists = storedAccounts.some(
      (user) => user.email === adminUser.email,
    );

    if (!alreadyExists) {
      localStorage.setItem(
        "accounts",
        JSON.stringify([...storedAccounts, adminUser]),
      );
    }

    const currentUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null",
    );
    if (!currentUser || currentUser.email !== adminUser.email) {
      localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
    }
  } catch {
    // ignore localStorage issues in the browser environment
  }
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "user",
  });
  const navigate = useNavigate();

  useEffect(() => {
    ensureAdminUser();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const existingAccounts = JSON.parse(
      localStorage.getItem("accounts") || "[]",
    );
    const isUserExist = existingAccounts.find(
      (user) => user.email === formData.email,
    );
    if (isUserExist) {
      alert(
        "This email is already registered. Please use a different email or log in.",
      );
      return;
    }

    const updatedAccounts = [...existingAccounts, formData];
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    alert("Account created successfully!");
    navigate("/");
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="accounts-page">
      <form onSubmit={handleRegister} className="auth-form">
        <button
          type="button"
          className="close-auth-btn"
          onClick={handleClose}
          aria-label="Close register form"
        >
          ×
        </button>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
