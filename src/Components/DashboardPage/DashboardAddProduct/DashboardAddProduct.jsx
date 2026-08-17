import "./DashboardAddProduct.css";

const DashboardAddProduct = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  onInputChange,
  onSaveProduct,
  isEditing,
}) => {
  return (
    <div className={`modal-overlay ${isModalOpen ? "active" : ""}`}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
          <button className="modal-close-btn" onClick={setIsModalOpen}>
            &times;
          </button>
        </div>

        <form onSubmit={onSaveProduct}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="prod-name">Product Name</label>
              <input
                type="text"
                id="prod-name"
                value={formData.name}
                onChange={onInputChange}
                placeholder="e.g. Classic Oversized Hoodie"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-sku">SKU Code</label>
              <input
                type="text"
                id="prod-sku"
                value={formData.sku}
                onChange={onInputChange}
                placeholder="e.g. HOODIE-009"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-category">Category</label>
              <select
                id="prod-category"
                value={formData.category}
                onChange={onInputChange}
                required
              >
                <option value="Tops">Tops</option>
                <option value="Polo Shirts">Polo Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Bottoms">Bottoms</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prod-price">Price ($)</label>
              <input
                type="number"
                id="prod-price"
                value={formData.price}
                onChange={onInputChange}
                placeholder="120.00"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-discount">Discount (%)</label>
              <input
                type="number"
                id="prod-discount"
                value={formData.discount}
                onChange={onInputChange}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-stock">Stock Quantity</label>
              <input
                type="number"
                id="prod-stock"
                value={formData.stock}
                onChange={onInputChange}
                placeholder="25"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-img1">Main Image URL</label>
              <input
                type="text"
                id="prod-img1"
                value={formData.img1}
                onChange={onInputChange}
                placeholder="/images/product-images/..."
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="prod-description">Description</label>
              <textarea
                id="prod-description"
                rows={3}
                value={formData.description}
                onChange={onInputChange}
                placeholder="Enter detailed product description..."
              ></textarea>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={setIsModalOpen}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddProduct;
