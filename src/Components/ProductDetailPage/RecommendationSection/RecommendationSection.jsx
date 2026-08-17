import React from 'react'
import ProductSection from '../../SharedComponents/ProductSection/ProductSection'
import { productsDatabase } from '../../../data/Products.js'
import { getProductsFromStorage } from "../../../utils/ProductsStorage";
const RecommendationSection = () => {
    const storedProducts = getProductsFromStorage();
    const products = storedProducts.length ? storedProducts : productsDatabase;
    const recommendationProducts = products.filter((product) => product.rate >= 4.5 && product.stock > 0);

  return (
    <ProductSection 
    title="YOU MIGHT ALSO LIKE"
    products={recommendationProducts}
    initialVisibleCount={4}
    />
  )
}

export default RecommendationSection