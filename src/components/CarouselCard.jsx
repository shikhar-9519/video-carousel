import { useEffect, useRef, useState } from "react"

export function CarouselCard({ background, title, description, ctaTheme, ctaText, className, ctaUrl, }) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const videoRef = useRef(null)
    const cardRef = useRef(null)
  
    useEffect(() => {
      if (!cardRef.current) return
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
  
              if (background.type === "video" && videoRef.current) {
                videoRef.current.play().catch((error) => {
                  console.error("Error playing video:", error)
                })
              }
  
              if (!hasAnimated) {
                setHasAnimated(true)
              }
            } else {
              setIsVisible(false)
  
              if (background.type === "video" && videoRef.current) {
                videoRef.current.pause()
              }
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(cardRef.current)
  
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current)
        }
      }
    }, [background.type, hasAnimated])
  
    const renderBackground = () => {
      switch (background.type) {
        case "color":
          return <div className="card-background" style={{ backgroundColor: background.value }} />
        case "image":
          return (
            <div
              className="card-background"
              style={{
                backgroundImage: `url(${background.value})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )
        case "video":
          return (
            <video
              ref={videoRef}
              className="card-background-video"
              src={background.value}
              muted
              loop
              playsInline
              preload="auto"
            />
          )
        default:
          return null
      }
    }

    const handleCtaClick = () => {
        if (ctaUrl) {
          window.open(ctaUrl, "_blank", "noopener,noreferrer")
        }
      }
  
    const getCtaClass = () => {
      switch (ctaTheme) {
        case "light":
          return "cta-light"
        case "dark":
          return "cta-dark"
        case "gradient":
          return "cta-gradient"
        case "outline":
          return "cta-outline"
        default:
          return "cta-light"
      }
    }
  
    return (
      <div ref={cardRef} className={`card-container ${className || ""}`}>
        {renderBackground()}
  
        <div className="card-overlay"></div>

        <div className="platform-logo-container">
        <div className={`platform-logo ${title.toLowerCase()}-logo`}></div>
      </div>
  
        <div className="card-content">
          <h2
            className={`card-title ${isVisible && hasAnimated ? "animate-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            {title}
          </h2>
  
          <p
            className={`card-description ${isVisible && hasAnimated ? "animate-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            {description}
          </p>
  
          <button
            className={`card-cta ${getCtaClass()} ${isVisible && hasAnimated ? "animate-in" : ""}`}
            style={{ transitionDelay: "600ms" }}
            onClick={handleCtaClick}
          >
            {ctaText}
          </button>
        </div>
      </div>
    )
  }