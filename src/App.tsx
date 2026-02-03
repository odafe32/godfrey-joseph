import { useState } from 'react'
import { Topbar } from './ui'
import HeroSection from './ui/Home/HeroSection'
import InfiniteLogoCarousel from './ui/Home/InfiniteCarousel'
import AboutSection from './ui/Home/AboutSection'
import ServicesSection from './ui/Home/ServicesSection'
import Footer from './ui/Home/Footer'
import Preloader from './components/Preloader'
import PortfolioShowcase from './ui/Home/PortfolioShowcase'
import ClientShowcase from './ui/Home/ClientShowcase'
import ALXSection from './ui/Home/ALXSection'
import HowIWork from './ui/Home/WorkToolkit'
import ImpactMetrics from './ui/Home/ImpactMetrics'
import TestimonialCard from './ui/Home/TestimonialCard'
import BrandSupportSection from './ui/Home/ContactUs'
import FloatingButtons from './components/FloatingButtons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Preloader>
      <Topbar/>
      <HeroSection/>
      {/* <InfiniteLogoCarousel/> */}
      <AboutSection/>
      <ServicesSection/>
      <PortfolioShowcase/>
      <ClientShowcase/>
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
