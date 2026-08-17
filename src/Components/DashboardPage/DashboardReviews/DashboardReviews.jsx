import "./DashboardReviews.css";
import { FaCheck, FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { ReviewData } from "../../../data/reviewsData";

const DashboardReviews = () => {
  return (
    <section className="section-card" id="reviews-section">
      <div className="card-title-row">
        <h3>Customer Reviews & Ratings</h3>
        <span
          style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}
        >
          Average Store Rating: <strong>4.8 / 5.0</strong>
        </span>
      </div>

      <div className="reviews-grid">
        {ReviewData.map((review) => (
          <div key={ReviewData.name} className="review-card">
            <div className="review-stars">
              {Array.from({ length: 5 }, (_, index) => {
                const filled = index + 1 <= Math.floor(review.stars);
                const half =
                  review.stars % 1 !== 0 && index === Math.floor(review.stars);

                if (filled) {
                  return <FaStar key={`${review.name}-${index}`} />;
                }

                if (half) {
                  return <FaStarHalfStroke key={`${review.name}-${index}`} />;
                }

                return <FaRegStar key={`${review.name}-${index}`} />;
              })}
            </div>
            <div className="review-author">
              <h4>{review.name}</h4>
              <span className="verified-badge">
                <FaCheck />
              </span>
            </div>
            <p className="review-comment">"{review.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardReviews;
