import './CartItem.css'
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ img, title, size, color, price, quantity, setItems }) => {
function increaseQuantity() {
  setItems(prevItems =>
    prevItems.map(item =>
      item.title === title
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  )
}
function decreaseQuantity() {
  setItems(prevItems =>
    prevItems.map(item =>
      item.title === title && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  )
}
function deleteItem() {
  setItems(prevItems =>
    prevItems.filter(item => item.title !== title)
  )
}
  return (
    <div className="cart-item">

      <img src={img} alt="" className="cart-item-img" />
    <div className='cart-item-info-actions'>
      <div className="cart-item-info">
        <h2>{title}</h2>
        <p>Size: {size}</p>
        <p>Color: {color}</p>
        <h3>${price}</h3>
      </div>

      <div className="cart-item-actions">

        <button className="delete-btn" onClick={deleteItem}>
          <RiDeleteBin6Line />
        </button>

        <div className="quantity">
          <button onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>

      </div>
    </div>
    </div>
    
  )
}

export default CartItem