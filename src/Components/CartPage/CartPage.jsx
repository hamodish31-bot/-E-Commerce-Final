import CartItems from "./CartItems/CartItems"
import CartSummary from "./CartSummary/CartSummary"
import { useCart } from "../SharedComponents/CartContext/CartContext"
import "./CartPage.css"

const CartPage = () => {
  const { items, setItems } = useCart()

  return (
    <section className="cart-page">
      <h1>YOUR CART</h1>
      <div className="cart-content">
        <CartItems items={items} setItems={setItems} />
        <CartSummary items={items} />
      </div>
    </section>
  )
}

export default CartPage