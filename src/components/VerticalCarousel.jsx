import { useEffect, useRef, useState } from "react"

export default function VerticalCarousel({ children, className }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef(null)
  const childrenArray = Array.isArray(children) ? children : [children]
  const totalSlides = childrenArray.length

  const throttleScroll = (callback, delay) => {
    let lastCall = 0
    return (event) => {
      const now = new Date().getTime()
      if (now - lastCall < delay) return
      lastCall = now
      callback(event)
    }
  }

  const handleScroll = (direction) => {
    if (isScrolling) return

    setIsScrolling(true)

    let newIndex
    if (direction === "down") {
      newIndex = activeIndex < totalSlides - 1 ? activeIndex + 1 : activeIndex
    } else {
      newIndex = activeIndex > 0 ? activeIndex - 1 : activeIndex
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }

    setTimeout(() => {
      setIsScrolling(false)
    }, 2000)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = throttleScroll((e) => {
      e.preventDefault()
      const direction = e.deltaY > 0 ? "down" : "up"
      handleScroll(direction)
    }, 500)

    const wheelListener = (e) => {
      e.preventDefault()
      handleWheel(e)
    }

    container.addEventListener("wheel", wheelListener, { passive: false })

    return () => {
      container.removeEventListener("wheel", wheelListener)
    }
  }, [activeIndex, isScrolling, totalSlides])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        handleScroll("down")
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        handleScroll("up")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex, isScrolling, totalSlides])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleScroll("down")
    } else if (touchStart - touchEnd < -50) {
      handleScroll("up")
    }
  }

  const handleDotClick = (index) => {
    if (isScrolling) return
    setIsScrolling(true)
    setActiveIndex(index)
    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${className || ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-slides" style={{ transform: `translateY(-${activeIndex * 100}%)` }}>
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              display: "block",
              visibility: "visible",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {childrenArray.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}