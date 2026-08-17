import "./Filter.css";

import {
  useState,
  useEffect,
} from "react";

import Slider from "rc-slider";

import "rc-slider/assets/index.css";

import {
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

import {
  productsDatabase,
} from "../../../data/Products";
import { getProductsFromStorage } from "../../../utils/ProductsStorage";


// =========================================================
// FILTER OPTIONS
// =========================================================
const storedProducts = getProductsFromStorage();
const products = storedProducts.length ? storedProducts : productsDatabase;
const cloths = [

  {
    id: "tops",
    title: "T-shirts",
    value: "Tops",
  },

  {
    id: "bottoms",
    title: "Shorts",
    value: "Bottoms",
  },

  {
    id: "shirts",
    title: "Shirts",
    value: "Shirts",
  },

  {
    id: "polo",
    title: "Polo Shirts",
    value: "Polo Shirts",
  },

];


// =========================================================
// DRESS STYLE
// =========================================================

const dressStyles = [

  "Casual",
  "Formal",
  "Party",
  "Gym",

];


// =========================================================
// COLORS
// =========================================================

const colors = [

  "Black",
  "White",
  "Grey",
  "Blue",
  "Navy",
  "Green",
  "Red",
  "Yellow",
  "Orange",
  "Pink",
  "Purple",
  "Aqua",
  "Khaki",
  "Slate",
  "Charcoal",
  "Dark Blue",

];


// =========================================================
// DEFAULT FILTERS
// =========================================================

const defaultFilters = {

  cloth: "",

  priceRange: [10, 300],

  colors: [],

  size: "",

  dressStyle: "",

};


// =========================================================
// COMPONENT
// =========================================================

function Filter({
  onClose,
  filters = defaultFilters,
  setFilters,
}) {


  // =======================================================
  // OPEN / CLOSE SECTIONS
  // =======================================================

  const [
    isOpen,
    setIsOpen,
  ] = useState({

    cloth: true,

    price: true,

    colors: true,

    size: true,

    dressStyle: true,

  });


  // =======================================================
  // LOCAL FILTER STATE
  // =======================================================

  const [
    priceRange,
    setPriceRange,
  ] = useState(
    filters?.priceRange ||
    [10, 300]
  );


  const [
    selectedColors,
    setSelectedColors,
  ] = useState(
    filters?.colors || []
  );


  const [
    selectedSize,
    setSelectedSize,
  ] = useState(
    filters?.size || ""
  );


  const [
    selectedCloth,
    setSelectedCloth,
  ] = useState(
    filters?.cloth || ""
  );


  const [
    selectedDressStyle,
    setSelectedDressStyle,
  ] = useState(
    filters?.dressStyle || ""
  );


  // =======================================================
  // SYNC WITH PARENT FILTERS
  // =======================================================

  useEffect(() => {

    setPriceRange(
      filters?.priceRange ||
      [10, 300]
    );

    setSelectedColors(
      filters?.colors || []
    );

    setSelectedSize(
      filters?.size || ""
    );

    setSelectedCloth(
      filters?.cloth || ""
    );

    setSelectedDressStyle(
      filters?.dressStyle || ""
    );

  }, [filters]);


  // =======================================================
  // GET ALL SIZES FROM DATABASE
  // =======================================================

  const allSizes = [

    ...new Set(

      products.flatMap(
        (product) =>
          product.sizes || []
      )

    ),

  ];


  // =======================================================
  // TOGGLE SECTION
  // =======================================================

  const toggleSection = (
    section
  ) => {

    setIsOpen(
      (previous) => ({

        ...previous,

        [section]:
          !previous[section],

      })
    );

  };


  // =======================================================
  // PRICE
  // =======================================================

  const handleSliderChange = (
    value
  ) => {

    setPriceRange(value);

  };


  // =======================================================
  // COLORS
  // =======================================================

  const handleColorChange = (
    color
  ) => {

    setSelectedColors(
      (previousColors) => {

        if (
          previousColors.includes(
            color
          )
        ) {

          return previousColors.filter(
            (item) =>
              item !== color
          );

        }

        return [

          ...previousColors,

          color,

        ];

      }
    );

  };


  // =======================================================
  // SIZE
  // =======================================================

  const handleSizeChange = (
    size
  ) => {

    setSelectedSize(
      (previousSize) =>
        previousSize === size
          ? ""
          : size
    );

  };


  // =======================================================
  // CATEGORY
  // =======================================================

  const handleClothChange = (
    cloth
  ) => {

    setSelectedCloth(
      (previousCloth) =>
        previousCloth === cloth
          ? ""
          : cloth
    );

  };


  // =======================================================
  // DRESS STYLE
  // =======================================================

  const handleDressStyleChange = (
    style
  ) => {

    setSelectedDressStyle(
      (previousStyle) =>
        previousStyle === style
          ? ""
          : style
    );

  };


  // =======================================================
  // APPLY FILTER
  // =======================================================

  const handleApplyFilter = () => {

    const newFilters = {

      cloth:
        selectedCloth,

      priceRange:
        priceRange,

      colors:
        selectedColors,

      size:
        selectedSize,

      dressStyle:
        selectedDressStyle,

    };


    // إرسال الفلاتر إلى FirstSection

    if (setFilters) {

      setFilters(
        newFilters
      );

    }


    // إغلاق الفلتر في الموبايل

    if (onClose) {

      onClose();

    }

  };


  // =======================================================
  // RESET FILTER
  // =======================================================

  const handleResetFilter = () => {

    const resetFilters = {

      cloth: "",

      priceRange: [10, 300],

      colors: [],

      size: "",

      dressStyle: "",

    };


    setPriceRange(
      resetFilters.priceRange
    );

    setSelectedColors(
      resetFilters.colors
    );

    setSelectedSize(
      resetFilters.size
    );

    setSelectedCloth(
      resetFilters.cloth
    );

    setSelectedDressStyle(
      resetFilters.dressStyle
    );


    if (setFilters) {

      setFilters(
        resetFilters
      );

    }

  };


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <section className="filter">


      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="filter-head">

        <h2>
          Filters
        </h2>


        {onClose && (

          <button
            type="button"
            className="filter-close-btn"
            onClick={onClose}
            aria-label="Close filters"
          >

            <FaTimes />

          </button>

        )}

      </div>


      <hr />


      {/* ===================================================
          CATEGORY
      =================================================== */}

      <div className="filter-category">

        <div
          className="category-head"
          onClick={() =>
            toggleSection(
              "cloth"
            )
          }
        >

          <h3>
            Category
          </h3>


          {isOpen.cloth ? (

            <FaChevronUp />

          ) : (

            <FaChevronDown />

          )}

        </div>


        {isOpen.cloth && (

          <div className="cloths-filter">

            {cloths.map(
              (cloth) => (

                <button
                  type="button"
                  key={cloth.id}
                  className={
                    selectedCloth ===
                    cloth.value
                      ? "selected-filter"
                      : ""
                  }
                  onClick={() =>
                    handleClothChange(
                      cloth.value
                    )
                  }
                >

                  <span>
                    {cloth.title}
                  </span>

                </button>

              )
            )}

          </div>

        )}

      </div>


      <hr />


      {/* ===================================================
          PRICE
      =================================================== */}

      <div className="price">

        <div
          className="price-head"
          onClick={() =>
            toggleSection(
              "price"
            )
          }
        >

          <h3>
            Price
          </h3>


          {isOpen.price ? (

            <FaChevronUp />

          ) : (

            <FaChevronDown />

          )}

        </div>


        {isOpen.price && (

          <div className="price-body">

            <Slider
              range
              min={10}
              max={300}
              value={priceRange}
              onChange={
                handleSliderChange
              }
            />


            <div className="price-range">

              <span>
                ${priceRange[0]}
              </span>

              <span>
                ${priceRange[1]}
              </span>

            </div>

          </div>

        )}

      </div>


      <hr />


      {/* ===================================================
          COLORS
      =================================================== */}

      <div className="colors">

        <div
          className="colors-head"
          onClick={() =>
            toggleSection(
              "colors"
            )
          }
        >

          <h3>
            Colors
          </h3>


          {isOpen.colors ? (

            <FaChevronUp />

          ) : (

            <FaChevronDown />

          )}

        </div>


        {isOpen.colors && (

          <div className="colors-body">

            {colors.map(
              (color) => {

                const colorClass =
                  color
                    .toLowerCase()
                    .replace(
                      /\s+/g,
                      "-"
                    );


                return (

                  <label
                    className="color-label"
                    key={color}
                    title={color}
                  >

                    <input
                      type="checkbox"
                      className="color-input"
                      value={color}
                      checked={
                        selectedColors.includes(
                          color
                        )
                      }
                      onChange={() =>
                        handleColorChange(
                          color
                        )
                      }
                    />


                    <span
                      className={`
                        circle
                        ${colorClass}
                      `}
                    />

                  </label>

                );

              }
            )}

          </div>

        )}

      </div>


      <hr />


      {/* ===================================================
          SIZE
      =================================================== */}

      <div className="filter-size">

        <div
          className="size-head"
          onClick={() =>
            toggleSection(
              "size"
            )
          }
        >

          <h3>
            Size
          </h3>


          {isOpen.size ? (

            <FaChevronUp />

          ) : (

            <FaChevronDown />

          )}

        </div>


        {isOpen.size && (

          <div className="size-body">

            {allSizes.map(
              (size) => (

                <button
                  type="button"
                  key={size}
                  className={
                    selectedSize === size
                      ? "active-size"
                      : ""
                  }
                  onClick={() =>
                    handleSizeChange(
                      size
                    )
                  }
                >

                  <span>
                    {size}
                  </span>

                </button>

              )
            )}

          </div>

        )}

      </div>


      <hr />


      {/* ===================================================
          DRESS STYLE
      =================================================== */}

      <div className="filter-dress-style">

        <div
          className="dress-style-head"
          onClick={() =>
            toggleSection(
              "dressStyle"
            )
          }
        >

          <h3>
            Dress Style
          </h3>


          {isOpen.dressStyle ? (

            <FaChevronUp />

          ) : (

            <FaChevronDown />

          )}

        </div>


        {isOpen.dressStyle && (

          <div className="dress-style-body">

            {dressStyles.map(
              (style) => (

                <button
                  type="button"
                  key={style}
                  className={
                    selectedDressStyle ===
                    style
                      ? "active-dress-style"
                      : ""
                  }
                  onClick={() =>
                    handleDressStyleChange(
                      style
                    )
                  }
                >

                  <span>
                    {style}
                  </span>


                  <FaChevronRight />

                </button>

              )
            )}

          </div>

        )}

      </div>


      {/* ===================================================
          ACTIONS
      =================================================== */}

      <div className="filter-actions">

        <button
          type="button"
          className="apply-filter-btn"
          onClick={
            handleApplyFilter
          }
        >

          Apply Filter

        </button>

      </div>


    </section>

  );

}


export default Filter;