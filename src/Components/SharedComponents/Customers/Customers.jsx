    import { useState, useEffect, useRef } from "react"
    import "./Customers.css"
    import { ReviewData } from "../../../data/reviewsData"
    import CustomerCard from "./CustomerCard/CustomerCard"

    const Customers = () => {
    const sliderRef = useRef(null)

    const [slideWidth, setSlideWidth] = useState(0)
    const [isStart, setIsStart] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
        const handleResize = () => {
        const card = document.querySelector(".comment-card")
        const container = document.querySelector(".customers-cards")

        if (card && container) {
            const gap = parseInt(getComputedStyle(container).gap) || 0

            setSlideWidth(card.offsetWidth + gap)
        }
        }

        handleResize()

        window.addEventListener("resize", handleResize)

        return () => {
        window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleScroll = () => {
        const slider = sliderRef.current

        if (!slider) return

        setIsStart(slider.scrollLeft <= 0)

        setIsEnd(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2)
    }

    const prevSlide = () => {
        sliderRef.current?.scrollBy({
        left: -slideWidth,
        behavior: "smooth",
        })
    }

    const nextSlide = () => {
        sliderRef.current?.scrollBy({
        left: slideWidth,
        behavior: "smooth",
        })
    }

// عرض التقييمات التي تحتوي على 5 نجوم فقط
    const fiveStarReviews = ReviewData.filter((review) => review.stars === 5);

    return (
        <section className="customers">
        <div className="customers-top">
            <h1>OUR HAPPY CUSTOMERS</h1>

            <div className="controls">
            <button
                className="control-btn"
                onClick={prevSlide}
                disabled={isStart}
            >
                <img src="/images/Vector (11).png" alt="Previous" />
            </button>

            <button className="control-btn" onClick={nextSlide} disabled={isEnd}>
                <img src="/images/Vector (10).png" alt="Next" />
            </button>
            </div>
        </div>

        <div className="customers-cards" ref={sliderRef} onScroll={handleScroll}>
            {fiveStarReviews.map((review) => (
            <CustomerCard
                key={review.id}
                name={review.name}
                stars={review.stars}
                verified={review.verified}
                text={review.text}
            />
            ))}
        </div>
        </section>
    )
    }

    export default Customers
