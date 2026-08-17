import "./Product.css";
import ProductShared from './ProductShared/ProductShared'
import { useParams } from "react-router-dom";
import { productsDatabase } from "../../../data/Products.js";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../SharedComponents/CartContext/CartContext"
import { getProductsFromStorage } from "../../../utils/ProductsStorage";


const storedProducts = getProductsFromStorage();
const products = storedProducts.length ? storedProducts : productsDatabase;
const Product = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
let selectedProduct = products.find((p) => p.id === Number(productId));
if (!selectedProduct) {
  selectedProduct = products[0];
}
    const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
    const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0]);
    const[quantity , setQuantity] = useState(1);
    const decrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
    const increase = () => {
      setQuantity(quantity + 1);
    }
    const handleAddToCart = () => {
    const finalPrice = selectedProduct.discount > 0 ? selectedProduct.price - (selectedProduct.price * selectedProduct.discount / 100) : selectedProduct.price;
    const productPayload = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      originalPrice: selectedProduct.price,
      discountPercentage: selectedProduct.discount,
      finalPrice: finalPrice,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      quantity: quantity,
      totalItemPrice: finalPrice * quantity,
      rate: selectedProduct.rate
    };
    console.log("Full Object Payload:", productPayload);
  };
    const { items, setItems } = useCart()

    const handleAddToCartUpdated = () => {
      const finalPrice = selectedProduct.discount > 0 ? selectedProduct.price - (selectedProduct.price * selectedProduct.discount / 100) : selectedProduct.price;
      const newItem = {
        id: selectedProduct.id,
        img: selectedProduct.images && selectedProduct.images.length ? selectedProduct.images[0] : selectedProduct.img1 || "/images/tshirt.png",
        title: selectedProduct.name,
        size: selectedSize,
        color: selectedColor,
        price: finalPrice,
        quantity: quantity,
        totalItemPrice: finalPrice * quantity
      }

      setItems(prevItems => {
        const matchIndex = prevItems.findIndex(item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color)
        if (matchIndex > -1) {
          return prevItems.map((item, idx) => idx === matchIndex ? { ...item, quantity: item.quantity + newItem.quantity, totalItemPrice: item.totalItemPrice + newItem.totalItemPrice } : item)
        }
        return [...prevItems, newItem]
      })
    }
  return (
    <div className="product-detail">
      <h2>{selectedProduct.name}</h2>
      <ProductShared
        name={selectedProduct.name}
        rate={selectedProduct.rate}
        price={selectedProduct.price}
        discount={selectedProduct.discount}
        paragraph={selectedProduct.description}
        colors={selectedProduct.colors}
        sizes={selectedProduct.sizes}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        images={selectedProduct.images}
      />
      <div className="but-number">
        <div className="but-number-2">
          <button className="but-minus" onClick={decrease}>-</button>
          <span className="scroul">{quantity}</span>
          <button className="but-plus" onClick={increase}>+</button>
        </div>
        <button className="but-add" onClick={handleAddToCartUpdated}>
          Add to Cart</button>
      </div>
    </div>
  )
}

export default Product