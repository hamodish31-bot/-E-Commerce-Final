import React from "react";
import "./ProductCard.css";
import { MdStar } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import { MdStarOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return [
    ...Array(fullStars).fill(<MdStar color="#FFC633"/>),
    ...(hasHalfStar ? [<MdStarHalf color="#FFC633"/>] : []),
    ...Array(emptyStars).fill(<MdStarOutline color="#FFC633"/>),
  ].map((icon, index) =>
    React.cloneElement(icon, {
      key: index,
      className: icon.props.className + " star-icon",
    }),
  );
};

const ProductCard = ({id, img1, name, rate, price, discount }) => {
  const navigate = useNavigate();
  const discountedPrice = discount
    ? (price - discount).toFixed(2)
    : null;

  return (
    <div className="product-card"
      onClick={() => navigate(`/productdetail/?id=${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/productdetail/?id=${id}`)}
    >
      <img src={img1} alt={name} className="card-img" />
      <h2>{name}</h2>
      <p className="card-rate">
        {renderStars(rate)}
        <span className="rate">{rate}/5</span>
      </p>
      <div className="card-price-row">
        {discount ? (
          <>
            <span className="discount-price">${discountedPrice}</span>
            <span className="original-price">${price}</span>
            <span className="discount-percent">-{discount}%</span>
          </>
        ) : (
          <span className="card-price">${price}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
