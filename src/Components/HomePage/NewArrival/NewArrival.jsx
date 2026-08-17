import React from "react";
import ProductSection from "../../SharedComponents/ProductSection/ProductSection";
import {productsDatabase} from "../../../data/Products.js"
import { getProductsFromStorage } from "../../../utils/ProductsStorage";
const NewArrival = () => {
const storedProducts = getProductsFromStorage();
const products = storedProducts.length ? storedProducts : productsDatabase;

const newProducts = products.filter((product) => product.stock > 10);
  return (
    <ProductSection
      title="New Arrival"
      products={newProducts}
      initialVisibleCount={4}
    />

  );
};

export default NewArrival;
