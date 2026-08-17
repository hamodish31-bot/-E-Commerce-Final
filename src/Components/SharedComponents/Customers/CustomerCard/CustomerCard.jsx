
import "./CustomerCard.css";

const CustomerCard = ({ name, stars, verified, text }) => {
    return (
        <div className="comment-card">

            <div className="stars">
                {Array.from({ length: stars }, (_, index) => (
                    <span key={index}>
                      <img
                  src="/images/Star 4.png"
                  alt="star"
                  />
                    </span>
                ))}
            </div>

            <div className="customer-name">
                <h2>{name}</h2>

                {verified && (
                    <span className="verified">
                      <img
                              src="/images/Vector (9).png"
                            alt="Verified"
                  />
                    </span>
                )}
            </div>

            <p className="the-comment">{text}</p>

        </div>
    );
};

export default CustomerCard;
