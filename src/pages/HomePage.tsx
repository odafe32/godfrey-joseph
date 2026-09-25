import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/ui/Home/HeroSection";
import AboutSection from "@/ui/Home/AboutSection";
import ServicesSection from "@/ui/Home/ServicesSection";
import PortfolioShowcase from "@/ui/Home/PortfolioShowcase";
import FeaturedProducts from "@/ui/Home/FeaturedProducts";
import HowIWork from "@/ui/Home/WorkToolkit";
import ImpactMetrics from "@/ui/Home/ImpactMetrics";
import TeachingSection from "@/ui/Home/TeachingSection";
import ConsultingSection from "@/ui/Home/ConsultingSection";
import SpeakingSection from "@/ui/Home/SpeakingSection";
import TestimonialCard from "@/ui/Home/TestimonialCard";
import KagayakiSection from "@/ui/Home/KagayakiSection";
import BrandSupportSection from "@/ui/Home/ContactUs";

export default function HomePage() {
  const { hash } = useLocation();

  // Scroll to the anchored section when arriving via /#section links
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
         <FeaturedProducts />
      <PortfolioShowcase />
   
      <HowIWork />
      <ImpactMetrics />
      <TeachingSection />
      <ConsultingSection />
      <SpeakingSection />
      <TestimonialCard />
      <KagayakiSection />
      <BrandSupportSection />
    </>
  );
}
