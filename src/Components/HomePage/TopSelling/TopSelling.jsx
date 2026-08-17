import React from "react";
import ProductSection from "../../SharedComponents/ProductSection/ProductSection";
import {productsDatabase} from "../../../data/Products.js"
import { getProductsFromStorage } from "../../../utils/ProductsStorage";
const TopSelling = () => {
const storedProducts = getProductsFromStorage();
const products = storedProducts.length ? storedProducts : productsDatabase;

const topSellingProducts = products.filter((product) => product.stock < 10);
  return (

    <ProductSection
      title="Top Selling"
      products={topSellingProducts}
      initialVisibleCount={4}
    />
  );
};

export default TopSelling;
