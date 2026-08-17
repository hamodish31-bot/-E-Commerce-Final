import "./DashboardProducts.css";
import { FaPenToSquare, FaPlus, FaRegTrashCan, FaStar } from "react-icons/fa6";

const DashboardProducts = ({
  products,
  searchQuery,
  onDeleteProduct,
  onAddProduct,
  onEditProduct,
}) => {
  const filteredProducts = !searchQuery.trim()
    ? products
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  return (
    <section className="section-card" id="products-section">
      <div className="table-toolbar">
        <div className="card-title-row" style={{ marginBottom: 0 }}>
          <h3>Product Inventory Catalog</h3>
        </div>

        <button
          className="btn-primary"
          style={{ padding: "8px 16px", fontSize: "13px" }}
          onClick={onAddProduct}
        >
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Stock Level</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div className="product-cell">
                      <img
                        src={
                          prod.img1 || "/images/product-images/T-shirt(1)-6.jpg"
                        }
                        alt={prod.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100";
                        }}
                      />
                      <div>
                        <div className="prod-title">{prod.name}</div>
                        <div className="prod-sku">
                          SKU: {prod.sku || `SKU-${prod.id}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{prod.category}</td>
                  <td>
                    <strong>${parseFloat(prod.price).toFixed(2)}</strong>
                  </td>
                  <td>
                    {prod.discount > 0 ? (
                      <span
                        style={{
                          color: "var(--color-danger)",
                          fontWeight: 700,
                        }}
                      >
                        -{prod.discount}%
                      </span>
                    ) : (
                      <span style={{ color: "var(--color-text-muted)" }}>
                        0%
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="stock-indicator">
                      <div className="stock-bar">
                        <div
                          className={`stock-bar-fill ${prod.stock < 8 ? "low" : prod.stock === 0 ? "out" : ""}`}
                          style={{
                            width: `${Math.min(100, (prod.stock / 20) * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <span>{prod.stock} in stock</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: "var(--color-star)" }}>
                      <FaStar /> {prod.rate || "4.5"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn"
                        title="Edit Product"
                        onClick={() => onEditProduct(prod)}
                      >
                        <FaPenToSquare />
                      </button>
                      <button
                        className="action-btn delete"
                        title="Delete Product"
                        onClick={() => onDeleteProduct(prod.id)}
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

export default DashboardProducts;
