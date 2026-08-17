import { useState } from "react"
import "./CartSummary.css"
import SummaryRow from "./SummaryRow/SummaryRow"
import { TbTag } from "react-icons/tb"
import { FiArrowRight } from "react-icons/fi"

const CartSummary = ({ items }) => {
const [promoCode, setPromoCode] = useState("")
const [discountPercent, setDiscountPercent] = useState(20)

  function calculateSubtotal() {
  let total = 0
  items.forEach(item => {
    total = total + item.price * item.quantity
  })
  return total
}

function calculateDiscount() {
  let discount = calculateSubtotal() * discountPercent / 100
  return discount
}

function calculateDeliveryFee() {
  let deliveryFee = 15
  return deliveryFee
}

function calculateTotal() {
  let total = calculateSubtotal() - calculateDiscount() + calculateDeliveryFee()
  return total
}

function applyPromoCode() {
  const percent = Number(promoCode)
  if (percent > 0) {
    setDiscountPercent(percent)
  } else {
    setDiscountPercent(20)
  }
  setPromoCode("")
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(items))
  console.log(items)
}
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <SummaryRow title="Subtotal" value={`$${calculateSubtotal()}`}/>
      <SummaryRow title={`Discount (-${discountPercent}%)`} value={`-$${calculateDiscount()}`}/>

      <SummaryRow title="Delivery Fee" value={`$${calculateDeliveryFee()}`}/>
      <hr />
      <SummaryRow title="Total" value={`$${calculateTotal()}`}/>


<div className="promo-code">
<div className="promo-input">
<TbTag className="promo-icon" />
  <input 
    type="text"
    placeholder="Add promo code"
    min="0"
    max="50"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
  />
</div>
  <button onClick={applyPromoCode}>Apply</button>
</div>

<button className="checkout-btn" onClick={saveCart}>
  Go to Checkout
  <FiArrowRight className="checkout-arrow" />
</button>
</div>
  )
}

export default CartSummary