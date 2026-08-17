import { useParams } from "react-router-dom";
import FirstSection from "../Components/CategoryPage/FirstSection/FirstSection";
import ProductSection from "../Components/SharedComponents/ProductSection/ProductSection";
import { productsDatabase } from "../data/Products";
import { getProductsFromStorage } from "../utils/ProductsStorage";

const Category = () => {
  const storedProducts = getProductsFromStorage();
const products = storedProducts.length ? storedProducts : productsDatabase;
  const { type } = useParams();

  if (!type) {
    return <FirstSection />;
  }

const normalizedType = type.replace(/-/g, "").toUpperCase();
const filteredProducts = products.filter((product) =>
    product.sku.toUpperCase().includes(normalizedType),
  );

  return (
    <ProductSection
      title={type.toUpperCase()}
      products={filteredProducts}
      initialVisibleCount={
        filteredProducts.length > 4 ? 4 : filteredProducts.length
      }
    />
  );
};

export default Category;
