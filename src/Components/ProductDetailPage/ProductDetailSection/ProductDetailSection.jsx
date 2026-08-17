import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import ProductImage from "../ProductImage/ProductImage";
import Product from "../Product/Product";
import "./ProductDetailSection.css";

const ProductDetailSection = () => {
  const breadcrumbItems = [
    { label: "Home", Link: "/" },
    { label: "Shop", Link: "/shop" },
    { label: "Men", Link: "/shop/men" },
    { label: "T-shirts", Link: "/shop/men/t-shirts" },
  ];
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  return (
    <div className="product-detail-section">
      <BreadCrumb item={breadcrumbItems} />
      <ProductImage />
      <Product />
    </div>
  );
};

export default ProductDetailSection;
