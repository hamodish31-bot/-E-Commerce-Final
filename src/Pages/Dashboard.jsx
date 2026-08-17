import { useState, useEffect, useMemo } from "react";
import "../Components/DashboardPage/DashboardPage.css";
import { productsDatabase } from "../data/Products.js";
import {
  saveProductToStorage,
  getProductsFromStorage,
} from "../utils/ProductsStorage.js";

import DashboardHeader from "../Components/DashboardPage/DashboardHeader/DashboardHeader";
import DashboardSidebar from "../Components/DashboardPage/DashboardSidebar/DashboardSidebar";
import DashboardOrders from "../Components/DashboardPage/DashboardOrders/DashboardOrders";
import DashboardProducts from "../Components/DashboardPage/DashboardProducts/DashboardProducts";
import DashboardReviews from "../Components/DashboardPage/DashboardReviews/DashboardReviews";
import DashboardAddProduct from "../Components/DashboardPage/DashboardAddProduct/DashboardAddProduct";

const initialOrders = [
  {
    id: "#ORD-8921",
    customer: "John Doe",
    email: "john.d@example.com",
    avatarBg: "",
    avatarColor: "",
    avatarText: "JD",
    date: "Oct 24, 2024",
    items: "2 items",
    total: 290.0,
    payment: "Credit Card",
    status: "Delivered",
  },
  {
    id: "#ORD-8922",
    customer: "Alice Smith",
    email: "alice.smith@example.com",
    avatarBg: "#E8F8F0",
    avatarColor: "#01B763",
    avatarText: "AS",
    date: "Oct 24, 2024",
    items: "1 item",
    total: 180.0,
    payment: "PayPal",
    status: "Processing",
  },
  {
    id: "#ORD-8923",
    customer: "Michael Brown",
    email: "m.brown@example.com",
    avatarBg: "#FEF3C7",
    avatarColor: "#D97706",
    avatarText: "MB",
    date: "Oct 23, 2024",
    items: "3 items",
    total: 520.0,
    payment: "Apple Pay",
    status: "Pending",
  },
  {
    id: "#ORD-8924",
    customer: "Sarah Wilson",
    email: "s.wilson@example.com",
    avatarBg: "#FEE2E2",
    avatarColor: "#DC2626",
    avatarText: "SW",
    date: "Oct 22, 2024",
    items: "1 item",
    total: 145.0,
    payment: "Credit Card",
    status: "Cancelled",
  },
];

const emptyFormData = {
  name: "",
  sku: "",
  category: "Tops",
  price: "",
  discount: "0",
  stock: "",
  img1: "",
  description: "",
};

const getDashboardOrdersFromCart = (cartItems = []) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return initialOrders;
  }

  const quantityTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0,
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  return [
    {
      id: `#ORD-${Date.now().toString().slice(-6)}`,
      customer: "Saved Customer",
      email: "saved-customer@shop.co",
      avatarBg: "#E8F8F0",
      avatarColor: "#01B763",
      avatarText: "SC",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      items: `${quantityTotal} ${quantityTotal === 1 ? "item" : "items"}`,
      total: Number((subtotal + 15).toFixed(2)),
      payment: "Saved Cart",
      status: "Processing",
    },
    ...initialOrders,
  ];
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderTab, setOrderTab] = useState("All Orders");
  const [dateRange, setDateRange] = useState("Monthly");
  const [activeNav, setActiveNav] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    const stored = getProductsFromStorage();
    if (stored && stored.length > 0) {
      setProducts(stored);
    } else {
      setProducts(productsDatabase);
      saveProductToStorage(productsDatabase);
    }

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setOrders(getDashboardOrdersFromCart(savedCart));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("prod-", "");
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
    setFormData(emptyFormData);
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormData(emptyFormData);
    setIsModalOpen(true);
  };

  const handleOpenEditProduct = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name || "",
      sku: product.sku || "",
      category: product.category || "Tops",
      price: String(product.price ?? ""),
      discount: String(product.discount ?? "0"),
      stock: String(product.stock ?? ""),
      img1: product.img1 || "",
      description: product.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;

    const productValues = {
      sku: formData.sku || `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount || "0"),
      stock: parseInt(formData.stock, 10),
      inStock: parseInt(formData.stock, 10) > 0,
      description: formData.description || "No description provided.",
      img1: formData.img1 || "/images/product-images/T-shirt(1)-6.jpg",
    };

    let updatedProducts;

    if (editingProductId !== null) {
      updatedProducts = products.map((product) =>
        product.id === editingProductId
          ? {
              ...product,
              ...productValues,
              id: editingProductId,
              rate: product.rate || 4.5,
            }
          : product,
      );
    } else {
      const newProduct = {
        id: Date.now(),
        rate: 5.0,
        ...productValues,
      };
      updatedProducts = [newProduct, ...products];
    }

    setProducts(updatedProducts);
    saveProductToStorage(updatedProducts);
    handleCloseModal();
  };

  const handleDeleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProductToStorage(updated);
  };

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div className="dash-topbar">
        <div className="topbar-content">
          <span className="topbar-badge">LIVE STORE</span>
          <span>SHOP.CO Merchant Dashboard &bull; All Systems Operational</span>
        </div>
      </div>

      <DashboardHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddProduct={handleOpenAddProduct}
      />

      <div className="dash-container">
        <DashboardSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          productsLength={products.length}
          ordersLength={orders.length}
        />

        <main className="dash-main">
          <section className="page-header" id="overview">
            <div className="page-title">
              <h2>Dashboard Overview</h2>
              <p>
                Welcome back, Alex! Here is what's happening with your store
                today.
              </p>
            </div>

            <div className="date-filter-group">
              {["Today", "Weekly", "Monthly", "Yearly"].map((period) => (
                <button
                  key={period}
                  className={`date-btn ${dateRange === period ? "active" : ""}`}
                  onClick={() => setDateRange(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </section>

          <DashboardOrders
            orders={orders}
            orderTab={orderTab}
            setOrderTab={setOrderTab}
            searchQuery={searchQuery}
            onDeleteOrder={handleDeleteOrder}
          />
          <DashboardProducts
            products={filteredProducts}
            searchQuery={searchQuery}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={handleOpenAddProduct}
            onEditProduct={handleOpenEditProduct}
          />
          <DashboardReviews />
        </main>
      </div>

      <DashboardAddProduct
        isModalOpen={isModalOpen}
        setIsModalOpen={handleCloseModal}
        formData={formData}
        onInputChange={handleInputChange}
        onSaveProduct={handleSaveProduct}
        isEditing={editingProductId !== null}
      />
    </div>
  );
};

export default Dashboard;
