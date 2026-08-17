import React, { useState, useEffect } from "react";
import "./ProductImage.css";
import { useSearchParams } from "react-router-dom";
import { productsDatabase } from "../../../data/Products.js";
import { getProductsFromStorage } from "../../../utils/ProductsStorage";

const ProductImage = () => {
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get("id"));
  const storedProducts = getProductsFromStorage();
  const products = storedProducts.length ? storedProducts : productsDatabase;
  const selectedProduct =
    products.find((p) => p.id === productId) || products[0];
  const images = selectedProduct?.images || [];
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  useEffect(() => {
    if (images && images.length) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage("");
    }
  }, [productId]);

  return (
    <div className="ProductImages">
      <div className="ProductImages-Select">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumbnail-${index}`}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            className={selectedImage === img ? "thumbnail active" : "thumbnail"}
            onClick={() => setSelectedImage(img)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedImage(img);
            }}
          />
        ))}
      </div>
      <div className="ProductImages-One">
        {selectedImage ? (
          <img key={selectedImage} src={selectedImage} alt="Selected product" />
        ) : (
          <div className="no-image">No image available</div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
