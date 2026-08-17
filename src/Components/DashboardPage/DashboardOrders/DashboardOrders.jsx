import "./DashboardOrders.css";
import { FaRegEye, FaRegTrashCan } from "react-icons/fa6";

const DashboardOrders = ({
  orders,
  orderTab,
  setOrderTab,
  searchQuery,
  onDeleteOrder,
}) => {
  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      orderTab === "All Orders" ||
      order.status.toLowerCase() === orderTab.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      order.id.toLowerCase().includes(q) ||
      order.customer.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <section className="section-card" id="orders-section">
      <div className="table-toolbar">
        <div className="card-title-row" style={{ marginBottom: 0 }}>
          <h3>Recent Orders</h3>
        </div>

        <div className="table-tabs">
          {[
            "All Orders",
            "Delivered",
            "Processing",
            "Pending",
            "Cancelled",
          ].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${orderTab === tab ? "active" : ""}`}
              onClick={() => setOrderTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  No orders found matching your search or filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <div
                        className="customer-avatar"
                        style={{
                          background: order.avatarBg || undefined,
                          color: order.avatarColor || undefined,
                        }}
                      >
                        {order.avatarText}
                      </div>
                      <div className="customer-meta">
                        <div className="name">{order.customer}</div>
                        <div className="email">{order.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.items}</td>
                  <td>
                    <strong>${order.total.toFixed(2)}</strong>
                  </td>
                  <td>{order.payment}</td>
                  <td>
                    <span
                      className={`status-badge badge-${order.status.toLowerCase()}`}
                    >
                      <span className="status-dot"></span> {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="action-btn" title="View Details">
                        <FaRegEye />
                      </button>
                      <button
                        className="action-btn delete"
                        title="Delete Order"
                        onClick={() => onDeleteOrder(order.id)}
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardOrders;
