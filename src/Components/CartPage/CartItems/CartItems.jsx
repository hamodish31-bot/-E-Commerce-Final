
import CartItem from "./CartItem/CartItem"

const CartItems = ({ items, setItems }) => {

  console.log(items)

  return (
    <div className="cart-items">

    {items.map((item, index) => (
  <CartItem
    key={index}
    img={item.img}
    title={item.title}
    size={item.size}
    color={item.color}
    price={item.price}
    quantity={item.quantity}
    setItems={setItems}
  />
))}

    </div>
  )
}

export default CartItems