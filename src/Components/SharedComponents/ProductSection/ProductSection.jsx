import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductSection.css";

const ProductSection = ({ title, products, initialVisibleCount = 4 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreProducts = !isExpanded && products.length > initialVisibleCount;

  const handleViewAll = () => {
    setIsExpanded(true);
  };

  return (
    <section className="product-section" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <h1 className="product-section-head">{title}</h1>
      <div className={`product-section-grid ${!isExpanded ? "hidden" : ""}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            img1={product.img1}
            name={product.name}
            rate={product.rate}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>
      {hasMoreProducts && (
        <button className="load-more-btn" onClick={handleViewAll}>
          View All
        </button>
      )}
    </section>
  );
};

export default ProductSection;
