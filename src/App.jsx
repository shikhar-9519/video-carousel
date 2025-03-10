import VerticalCarousel from "./components/VerticalCarousel"
import { CarouselCard } from "./components/CarouselCard"
import "./App.css"
import facebookVideo from "./assets/facebook_video2.mp4"
import snapVideo from "./assets/snapchat_video.mp4"
import instaVideo from "./assets/insta_video.mp4"

export default function App() {
  return (
    <main className="main-container">
      <VerticalCarousel>
        <CarouselCard
          background={{ type: "video", value: instaVideo }}
          title="Instagram"
          description="Share your moments with the world through photos and videos."
          ctaTheme="light"
          ctaText="Follow Us on Instagram"
          ctaUrl="https://www.instagram.com"
        />
        <CarouselCard
          background={{ type: "image", value: "/placeholder.svg?height=1080&width=1920" }}
          title="Twitter"
          description="Join the conversation and see what's happening in the world right now."
          ctaTheme="dark"
          ctaText="Follow Us on Twitter"
          ctaUrl="https://twitter.com"
        />
        <CarouselCard
          background={{ type: "video", value: snapVideo }}
          title="Snapchat"
          description="Capture and share moments with friends and family."
          ctaTheme="gradient"
          ctaText="Connect on Snapchat"
          ctaUrl="https://www.snapchat.com"
        />
        <CarouselCard
          background={{ type: "video", value: facebookVideo }}
          title="Facebook"
          description="Connect with friends, family, and people who share your interests."
          ctaTheme="outline"
          ctaText="Like Us on Facebook"
          ctaUrl="https://www.facebook.com"
        />
        <CarouselCard
          background={{ type: "color", value: "#FF0000" }}
          title="YouTube"
          description="Discover and share videos from creators around the globe."
          ctaTheme="outline"
          ctaText="Subscribe on YouTube"
          ctaUrl="https://www.youtube.com"
        />
      </VerticalCarousel>
    </main>
  )
}

