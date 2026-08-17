import Filter from "../Filter/Filter";
import ProductCard from "../../SharedComponents/ProductCard/ProductCard";
import "./CategorySection.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useState, useEffect } from "react";

import { productsDatabase } from "../../../data/Products";
import { getProductsFromStorage } from "../../../utils/ProductsStorage";

function CategorySection({ filters, setFilters }) {
  // =========================================================
  // STATES
  // =========================================================

  const [selectedNum, setSelectedNum] = useState(1);

  const [isResponsive, setIsResponsive] = useState(false);

  const [showFilter, setShowFilter] = useState(false);

  // =========================================================
  // RESPONSIVE
  // =========================================================

  useEffect(() => {
    const checkScreenSize = () => {
      setIsResponsive(window.innerWidth < 992);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // =========================================================
  // PRODUCTS PER PAGE
  // =========================================================

  const productsPerPage = isResponsive ? 6 : 9;

  // =========================================================
  // SIZE MAP
  // =========================================================

  const sizeMap = {
    "XX-Small": "XXS",

    "X-Small": "XS",

    Small: "S",

    Medium: "M",

    Large: "L",

    "X-Large": "XL",

    "XX-Large": "XXL",

    "3X-Large": "3XL",

    "4X-Large": "4XL",
  };

  // =========================================================
  // FILTER PRODUCTS
  // =========================================================
  const storedProducts = getProductsFromStorage();
  const sourceProducts = storedProducts.length
    ? storedProducts
    : productsDatabase;
  const filteredProducts = sourceProducts.filter((product) => {
    // =================================================
    // CATEGORY
    // =================================================

    const matchesCategory =
      !filters.cloth || product.category === filters.cloth;

    // =================================================
    // PRICE
    // =================================================

    const [minPrice, maxPrice] = filters.priceRange;

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    // =================================================
    // COLORS
    // =================================================

    const matchesColors =
      filters.colors.length === 0 ||
      filters.colors.some((selectedColor) =>
        (product.colors || []).some(
          (productColor) =>
            productColor.toLowerCase() === selectedColor.toLowerCase(),
        ),
      );

    // =================================================
    // SIZE
    // =================================================

    const selectedProductSize = sizeMap[filters.size] || filters.size;

    const matchesSize =
      !filters.size ||
      (product.sizes || []).some(
        (productSize) =>
          productSize.toLowerCase() === selectedProductSize.toLowerCase(),
      );

    // =================================================
    // DRESS STYLE / TAGS
    // =================================================

    const matchesDressStyle =
      !filters.dressStyle ||
      (product.tags || []).some(
        (tag) => tag.toLowerCase() === filters.dressStyle.toLowerCase(),
      );

    // =================================================
    // FINAL RESULT
    // =================================================

    return (
      matchesCategory &&
      matchesPrice &&
      matchesColors &&
      matchesSize &&
      matchesDressStyle
    );
  });

  // =========================================================
  // TOTAL PAGES
  // =========================================================

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // =========================================================
  // CURRENT PAGE
  // =========================================================

  const startIndex = (selectedNum - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  // =========================================================
  // FIX CURRENT PAGE
  // =========================================================

  useEffect(() => {
    if (totalPages > 0 && selectedNum > totalPages) {
      setSelectedNum(totalPages);
    }

    if (totalPages === 0 && selectedNum !== 1) {
      setSelectedNum(1);
    }
  }, [selectedNum, totalPages]);

  // =========================================================
  // APPLY FILTERS
  // =========================================================

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);

    // العودة للصفحة الأولى
    setSelectedNum(1);

    // إغلاق فلتر الموبايل
    setShowFilter(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // PAGE CLICK
  // =========================================================

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setSelectedNum(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // PREVIOUS
  // =========================================================

  const handlePrevious = () => {
    if (selectedNum > 1) {
      handlePageClick(selectedNum - 1);
    }
  };

  // =========================================================
  // NEXT
  // =========================================================

  const handleNext = () => {
    if (selectedNum < totalPages) {
      handlePageClick(selectedNum + 1);
    }
  };

  // =========================================================
  // PAGE NUMBERS
  // =========================================================

  const getPageNumbers = () => {
    // -------------------------------------------------
    // 7 PAGES OR LESS
    // -------------------------------------------------

    if (totalPages <= 7) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) => index + 1,
      );
    }

    // -------------------------------------------------
    // FIRST PAGES
    // -------------------------------------------------

    if (selectedNum <= 3) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // -------------------------------------------------
    // LAST PAGES
    // -------------------------------------------------

    if (selectedNum >= totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // -------------------------------------------------
    // MIDDLE PAGES
    // -------------------------------------------------

    return [
      1,
      "...",
      selectedNum - 1,
      selectedNum,
      selectedNum + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  // =========================================================
  // CLOSE MOBILE FILTER WHEN DESKTOP
  // =========================================================

  useEffect(() => {
    if (!isResponsive) {
      setShowFilter(false);
    }
  }, [isResponsive]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="category-section">
      {/* =================================================
                MOBILE FILTER
            ================================================= */}

      {isResponsive && showFilter ? (
        <div className="mobile-filter-wrapper">
          <Filter
            onClose={() => setShowFilter(false)}
            filters={filters}
            setFilters={handleApplyFilters}
          />
        </div>
      ) : (
        <>
          {/* =========================================
                        HEADER
                    ========================================= */}

          <div className="category-heading">
            <h1>Casual</h1>

            <span className="spam-header-para">
              <p>
                Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-
                {Math.min(endIndex, filteredProducts.length)} of{" "}
                {filteredProducts.length} Products
              </p>

              <h2>
                Sort by:
                <span className="spam2-header-para"> Most Popular</span>
              </h2>

              <img
                src="/images/images-product-card/Dawn-arrow.png"
                alt="Sort"
              />
            </span>

            {/* =====================================
                            MOBILE FILTER BUTTON
                        ===================================== */}

            <button
              type="button"
              className="category-header-btn-filter"
              onClick={() => setShowFilter(true)}
              aria-label="Open filters"
              aria-expanded={showFilter}
            >
              <img src="/images/Vector (19).png" alt="Filter" />
            </button>
          </div>

          {/* =========================================
                        PRODUCTS
                    ========================================= */}

          <div className="products-grid">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p
                style={{
                  gridColumn: "1 / -1",

                  textAlign: "center",

                  width: "100%",

                  padding: "40px 0",
                }}
              >
                No products match your filters.
              </p>
            )}
          </div>

          {/* =========================================
                        PAGINATION
                    ========================================= */}

          {totalPages > 1 && (
            <div className="category-page">
              {/* =================================
                                PREVIOUS
                            ================================= */}

              <button
                type="button"
                className="category-page-btns"
                onClick={handlePrevious}
                disabled={selectedNum === 1}
              >
                <FaArrowLeft
                  className="
                                        icon-arrow
                                        icon-arrow--left
                                    "
                />
                Previous
              </button>

              {/* =================================
                                PAGE NUMBERS
                            ================================= */}

              <div className="quantity-selector-container">
                <div className="number-selector">
                  {pageNumbers.map((page, index) => {
                    // -----------------
                    // DOTS
                    // -----------------

                    if (page === "...") {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="
                                                            num-btn
                                                            dots
                                                        "
                        >
                          ...
                        </span>
                      );
                    }

                    // -----------------
                    // PAGE BUTTON
                    // -----------------

                    return (
                      <button
                        type="button"
                        key={page}
                        className={`
                                                        num-btn
                                                        ${
                                                          selectedNum === page
                                                            ? "active"
                                                            : ""
                                                        }
                                                    `}
                        onClick={() => handlePageClick(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =================================
                                NEXT
                            ================================= */}

              <button
                type="button"
                className="category-page-btns"
                onClick={handleNext}
                disabled={selectedNum === totalPages}
              >
                Next
                <FaArrowRight
                  className="
                                        icon-arrow
                                        icon-arrow--right
                                    "
                />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CategorySection;
