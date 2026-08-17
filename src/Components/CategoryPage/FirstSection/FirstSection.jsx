import { useState } from "react";
import Filter from "../Filter/Filter";
import CategorySection from "../CategorySection/CategorySection";
import "./FirstSection.css";

const FirstSection = () => {

    // =========================================================
    // GLOBAL FILTER STATE
    // =========================================================

    const [filters, setFilters] = useState({
        cloth: "",
        priceRange: [10, 300],
        colors: [],
        size: "",
        dressStyle: "",
    });

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="first-section">

            {/* =================================================
                DESKTOP FILTER
            ================================================= */}

            <div className="desktop-filter">

                <Filter
                    filters={filters}
                    setFilters={setFilters}
                />

            </div>


            {/* =================================================
                PRODUCTS + MOBILE FILTER
            ================================================= */}

            <CategorySection
                filters={filters}
                setFilters={setFilters}
            />

        </div>
    );
};

export default FirstSection;