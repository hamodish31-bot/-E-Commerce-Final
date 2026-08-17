import "./Reviews.css";
import { useState, useEffect } from "react";
import { ReviewData } from "../../../data/reviewsData";

const ProductDetailsData = [
  {
    id: 1,
    title: "Material",
    value: "100% Cotton",
  },
  {
    id: 2,
    title: "Fit",
    value: "Regular Fit",
  },
  {
    id: 3,
    title: "Color",
    value: "Black",
  },
  {
    id: 4,
    title: "Size",
    value: "S, M, L, XL",
  },
];

const FAQsData = [
  {
    id: 1,
    question: "How can I choose the right size?",
    answer: "You can check our size guide to choose the right size.",
  },
  {
    id: 2,
    question: "Is this product washable?",
    answer:
      "Yes, the product can be washed according to the care instructions.",
  },
  {
    id: 3,
    question: "How long does delivery take?",
    answer: "Delivery usually takes between 3 and 5 business days.",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(ReviewData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const [initialVisibleCount, setInitialVisibleCount] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  // حالات نموذج كتابة المراجعة
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewStars, setNewReviewStars] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");

  // حالة قائمة النقاط الثلاثة
  const [openReviewMenu, setOpenReviewMenu] = useState(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      setInitialVisibleCount(window.innerWidth <= 390 ? 3 : 6);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const filteredReviewData = reviews.filter((review) => {
    if (selectedStars === "all") return true;

    return review.stars === Number(selectedStars);
  });

  const sortedReviewData = [...filteredReviewData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  const reviewsToShow = isExpanded
    ? sortedReviewData
    : sortedReviewData.slice(0, initialVisibleCount);

  const hasMoreReviews =
    !isExpanded && sortedReviewData.length > initialVisibleCount;

  const handleLoadMore = () => {
    setIsExpanded(true);
  };

  const handleFilterChange = (stars) => {
    setSelectedStars(stars);
    setIsFilterOpen(false);
    setIsExpanded(false);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setIsExpanded(false);
  };

  // فتح نموذج كتابة المراجعة
  const handleOpenReviewForm = () => {
    setIsReviewFormOpen(true);
  };

  // إغلاق نموذج كتابة المراجعة
  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
  };

  // إرسال المراجعة
  const handleSubmitReview = (event) => {
    event.preventDefault();

    if (!newReviewName.trim() || !newReviewText.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: newReviewName.trim(),
      stars: Number(newReviewStars),
      text: newReviewText.trim(),
      date: new Date().toISOString().split("T")[0],
      verified: false,
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);

    setNewReviewName("");
    setNewReviewStars(5);
    setNewReviewText("");

    setSelectedStars("all");
    setSortOrder("latest");
    setIsExpanded(false);
    setIsReviewFormOpen(false);
  };

  // فتح وإغلاق قائمة النقاط الثلاثة
  const handleToggleReviewMenu = (reviewId) => {
    setOpenReviewMenu(openReviewMenu === reviewId ? null : reviewId);
  };

  // حذف المراجعة
  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId),
    );

    setOpenReviewMenu(null);
  };

  return (
    <section className="reviews">
      <div className="reviews-section">
        <button
          className={activeTab === "details" ? "active-btn" : "btn-top"}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>

        <button
          className={activeTab === "reviews" ? "active-btn" : "btn-top"}
          onClick={() => setActiveTab("reviews")}
        >
          Rating & Reviews
        </button>

        <button
          className={activeTab === "faqs" ? "active-btn" : "btn-top"}
          onClick={() => setActiveTab("faqs")}
        >
          FAQs
        </button>
      </div>

      {activeTab === "reviews" && (
        <>
          <div className="reviews-header">
            <div className="reviews-title">
              <h2>
                All Reviews <span>({sortedReviewData.length})</span>
              </h2>
            </div>

            <div className="reviews-control">
              <button
                className="btn-filter"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <img src="/images/Vector (19).png" alt="Filter" />
              </button>

              {isFilterOpen && (
                <div className="filter-menu">
                  <ul className="filter-list">
                    <li
                      className={
                        selectedStars === "all"
                          ? "filter-item selected"
                          : "filter-item"
                      }
                      onClick={() => handleFilterChange("all")}
                    >
                      All Ratings
                    </li>

                    {[5, 4, 3, 2, 1].map((num) => (
                      <li
                        key={num}
                        className={
                          selectedStars === num
                            ? "filter-item selected"
                            : "filter-item"
                        }
                        onClick={() => handleFilterChange(num)}
                      >
                        {num} Stars ⭐
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <select
                className="select-sort"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="latest">Latest</option>

                <option value="oldest">Oldest</option>
              </select>

              <button
                className="btn-write-review"
                onClick={handleOpenReviewForm}
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* نموذج كتابة المراجعة */}
          {isReviewFormOpen && (
            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="review-form-header">
                <h3>Write a Review</h3>

                <button
                  type="button"
                  className="close-review-form"
                  onClick={handleCloseReviewForm}
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                placeholder="Your name"
                value={newReviewName}
                onChange={(event) => setNewReviewName(event.target.value)}
                required
              />

              <select
                value={newReviewStars}
                onChange={(event) => setNewReviewStars(event.target.value)}
              >
                <option value="5">5 Stars ⭐</option>

                <option value="4">4 Stars ⭐</option>

                <option value="3">3 Stars ⭐</option>

                <option value="2">2 Stars ⭐</option>

                <option value="1">1 Star ⭐</option>
              </select>

              <textarea
                placeholder="Write your review..."
                value={newReviewText}
                onChange={(event) => setNewReviewText(event.target.value)}
                required
              />

              <button type="submit" className="submit-review">
                Submit Review
              </button>
            </form>
          )}

          <div className="reviews-cards">
            {reviewsToShow.length > 0 ? (
              reviewsToShow.map((review) => (
                <div className="rev-card" key={review.id}>
                  <div className="rev-star-and-points">
                    <div className="rev-stars">
                      {Array.from({
                        length: review.stars,
                      }).map((_, index) => (
                        <img key={index} src="/images/Star 4.png" alt="star" />
                      ))}
                    </div>

                    {/* النقاط الثلاثة */}
                    <div className="review-menu-wrapper">
                      <button
                        type="button"
                        className="points"
                        onClick={() => handleToggleReviewMenu(review.id)}
                      >
                        ...
                      </button>

                      {openReviewMenu === review.id && (
                        <div className="review-menu">
                          <button type="button">Edit Review</button>

                          <button
                            type="button"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            Delete Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="review-user">
                    <h3>
                      {review.name}

                      {review.verified && (
                        <img src="/images/Vector (9).png" alt="Verified" />
                      )}
                    </h3>
                  </div>

                  <p className="review-text">{review.text.trim()}</p>

                  <span className="date">Posted on {review.date}</span>
                </div>
              ))
            ) : (
              <p className="no-reviews">
                No reviews found matching this rating.
              </p>
            )}
          </div>

          {hasMoreReviews && (
            <button className="btn-load-more" onClick={handleLoadMore}>
              Load More Reviews
            </button>
          )}
        </>
      )}

      {activeTab === "details" && (
        <div className="product-details">
          {ProductDetailsData.map((item) => (
            <div className="product-detail-item" key={item.id}>
              <h3>{item.title}</h3>

              <p>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="faqs">
          {FAQsData.map((item) => (
            <div className="faq-item" key={item.id}>
              <h3>{item.question}</h3>

              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Reviews;
