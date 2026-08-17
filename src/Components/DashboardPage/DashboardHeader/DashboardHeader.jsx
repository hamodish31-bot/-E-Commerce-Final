import "./DashboardHeader.css";
import {
  FaMagnifyingGlass,
  FaPlus,
  FaRegBell,
  FaRegEnvelope,
} from "react-icons/fa6";

const DashboardHeader = ({ searchQuery, setSearchQuery, onAddProduct }) => {
  return (
    <header className="dash-header">
      <div className="brand-logo">
        <a href="/">
          <h1>SHOP.CO</h1>
        </a>
        <span className="dash-tag">DASHBOARD</span>
      </div>

      <div className="dash-search">
        <FaMagnifyingGlass className="search-icon" />
        <input
          type="text"
          placeholder="Search orders, products, customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="dash-user-controls">
        <button className="btn-primary" onClick={onAddProduct}>
          <FaPlus />
          <span>Add Product</span>
        </button>

        <button className="icon-btn" title="Notifications">
          <FaRegBell />
          <span className="badge-dot"></span>
        </button>

        <button className="icon-btn" title="Messages">
          <FaRegEnvelope />
        </button>

        <div className="user-profile">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Admin Profile"
          />
          <div className="user-info">
            <span className="user-name">Alex Smith</span>
            <span className="user-role">Store Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
