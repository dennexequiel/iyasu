import Contact from "./components/contact";
import Experience from "./components/experience";
import HealingMadeSimple from "./components/healing-made-simple";
import HeroCarousel from "./components/hero-carousel";
import Newsletter from "./components/newsletter";
import Shop from "./components/shop";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <main>
      <HeroCarousel/>
      <HealingMadeSimple/>
      <Shop/>
      <Experience/>
      <Testimonials/>
      <Newsletter/>
      <Contact/>
    </main>
  )
}