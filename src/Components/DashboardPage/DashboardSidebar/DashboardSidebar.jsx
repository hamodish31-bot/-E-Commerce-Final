import "./DashboardSidebar.css";
import {
  FaBagShopping,
  FaBox,
  FaChartLine,
  FaChartPie,
  FaGear,
  FaStar,
  FaTicket,
  FaUsers,
} from "react-icons/fa6";

const menuItems = [
  { id: "products-section", label: "Products", icon: FaBox },
  { id: "orders-section", label: "Orders", icon: FaBagShopping },
  { id: "customers-section", label: "Customers", icon: FaUsers },
];

const managementItems = [
  { id: "reviews-section", label: "Reviews", icon: FaStar },
];

const DashboardSidebar = ({
  activeNav,
  setActiveNav,
  productsLength,
  ordersLength,
}) => {
  return (
    <aside className="dash-sidebar">
      <div>
        <span className="sidebar-label">Main Menu</span>
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={`sidebar-item ${activeNav === item.id ? "active" : ""}`}
              >
                <a href={`#${item.id}`} onClick={() => setActiveNav(item.id)}>
                  <div className="sidebar-item-content">
                    <Icon />
                    <span>{item.label}</span>
                  </div>
                  {item.id === "products-section" ||
                  item.id === "orders-section" ? (
                    <span className="nav-badge">
                      {item.id === "products-section"
                        ? productsLength
                        : ordersLength}
                    </span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <span className="sidebar-label">Management</span>
        <ul className="sidebar-menu">
          {managementItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={`sidebar-item ${activeNav === item.id ? "active" : ""}`}
              >
                <a
                  href={
                    item.id === "reviews-section"
                      ? "#reviews-section"
                      : `#${item.id}`
                  }
                  onClick={() =>
                    item.id !== "discounts" &&
                    item.id !== "settings" &&
                    setActiveNav(item.id)
                  }
                >
                  <div className="sidebar-item-content">
                    <Icon />
                    <span>{item.label}</span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-footer-card">
        <h4>SHOP.CO Store</h4>
        <p>Catalog sync: 100%</p>
        <div className="store-status">
          <span className="status-dot"></span>
          <span>Online & Accepting Orders</span>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
