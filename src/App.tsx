import { Topbar } from './ui'
import HeroSection from './ui/Home/HeroSection'
import AboutSection from './ui/Home/AboutSection'
import ServicesSection from './ui/Home/ServicesSection'
import Footer from './ui/Home/Footer'
import Preloader from './components/Preloader'
import PortfolioShowcase from './ui/Home/PortfolioShowcase'
import HowIWork from './ui/Home/WorkToolkit'
import ImpactMetrics from './ui/Home/ImpactMetrics'
import TestimonialCard from './ui/Home/TestimonialCard'
import BrandSupportSection from './ui/Home/ContactUs'
import FloatingButtons from './components/FloatingButtons'

function App() {
  return (
    <Preloader>
      <Topbar/>
      <HeroSection/>
      {/* <InfiniteLogoCarousel/> */}
      <AboutSection/>
      <ServicesSection/>

      <PortfolioShowcase/>
      {/* <ALXSection/> */}
      <HowIWork/>
      <ImpactMetrics/>
      <TestimonialCard/>
      <BrandSupportSection/>
      <Footer/>
      <FloatingButtons/>
    </Preloader>
  )
}

export default App
