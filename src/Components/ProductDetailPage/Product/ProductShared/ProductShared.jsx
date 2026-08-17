import "./ProductShared.css";
import { MdStar } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
const ProductShared = ({title,price,discount,rate,paragraph,colors,sizes,selectedColor,setSelectedColor,selectedSize,setSelectedSize,
}) => {
  const hasDiscount = typeof discount === 'number' && discount > 0;
  const finalPrice = hasDiscount ? price - discount : price;
  const rateParts = typeof rate === 'string' ? rate.split('/') : [rate, ''];
  const rateMain = rateParts[0] || '';
  const rateTotal = rateParts[1] || '';
  const currentColor = selectedColor || (colors && colors.length ? colors[0] : '');
  const currentSize = selectedSize || (sizes && sizes.length ? sizes[0] : '');
  return (
    <>
      <h2>{title}</h2>
      <div className="product-rate">
        <div className="product-rate-img">
          <MdStar color="#FFC633"/>
          <MdStar color="#FFC633"/>
          <MdStar color="#FFC633"/>
          <MdStar color="#FFC633"/>
          <MdStarHalf color="#FFC633"/>
        </div>
      <p>
        {rateMain}
        {rateTotal ? (
          <>
            /
            <span className="rate-total">{rateTotal}</span>
          </>
        ) : null}
      </p>
      </div>
      <div className="f-o-d-price">
        {hasDiscount ? (
          <>
            <span className="final-price">${finalPrice}</span>
            <span className="original-price">${price}</span>
            <span className="discount">-{discount}%</span>
          </>
        ) : (
          <span className="final-price">${price}</span>
        )}
      </div>
      <p className="paragraph-p3">{paragraph}</p>
      <hr className="hr" />
      <div>
        <h4>Select Colors</h4>
        <div className="box-color">
          {colors.map((color, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={currentColor === color ? 'color-button color-active' : 'color-button'}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            >
              {currentColor === color ? <FaCheck className="color-check" /> : null}
            </button>
          ))}
        </div>
      </div>
      <hr className="hr" />
      <div>
        <h4>Choose Size</h4>
        <div className="but-size">
          
          {sizes.map((size, index) => (
            <button 
              key={index} 
              onClick={() => setSelectedSize(size)}
              className={currentSize === size ? 'active' : ''}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <hr className="hr" />
    </>
  )
}

export default ProductShared