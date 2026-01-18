import React from 'react';
import { Briefcase, Calendar, FileText, Compass } from 'lucide-react';

const HeroSection = () => {
  const services = [
    {
      number: "01",
      title: "Executive Virtual Assistance",
      icon: Briefcase
    },
    {
      number: "02", 
      title: "Brand & LinkedIn Support",
      icon: Compass
    },
    {
      number: "03",
      title: "Proposals & Presentations", 
      icon: FileText
    },
    {
      number: "04",
      title: "Calendar, Inbox & Operations",
      icon: Calendar
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* White Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-[#7d4934]/90 text-lg font-light tracking-wide">
                Hey, I’m
              </p>
              <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black text-[#7d4934] leading-[0.85] tracking-tight">
                Josephine
                <br />
                <span>Chibuike</span>
              </h1>
            </div>

            {/* Mobile Quote */}
            <div className="lg:hidden xl:block space-y-4 max-w-md">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#7d4934] leading-tight">
                Structure behind
                <br />
                every growing brand.
              </h2>
              <p className="text-[#7d4934]/80 text-base leading-relaxed">
                I help founders and executives move from
                <br />
                operational overwhelm to structured clarity.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            
            {/* Desktop Quote */}
            {/* <div className="hidden lg:block space-y-6 absolute top-0 right-0 max-w-sm z-20">
              <h2 className="text-2xl xl:text-3xl font-bold text-[#7d4934] leading-tight">
                Structure behind
                <br />
                every growing brand.
              </h2>
              <p className="text-[#7d4934]/80 text-base leading-relaxed">
                From inbox to pitch decks, I create
                <br />
                clarity that supports scale.
              </p>
            </div> */}

            {/* Hero Image */}
            <div className="relative mx-auto lg:mx-0 w-80 h-96 xl:w-[500px] xl:h-[550px]">
              <div className="relative w-full h-full">
                <img 
                  src="/logotwo.JPG" 
                  alt="Josephine Chibuike – Executive Virtual Assistant" 
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />

                {/* Circular Fade */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(125, 73, 52, 0.15) 60%, rgba(125, 73, 52, 0.5) 80%, #7d4934 100%)`
                  }}
                />
              </div>

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-800/30 via-amber-700/20 to-transparent rounded-full blur-xl scale-110 -z-10" />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-20 lg:mt-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.number}
                  className="group relative animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <span className="text-[#7d4934]/60 font-mono text-sm">
                    #{service.number}
                  </span>
                  <h3 className="text-[#7d4934] font-semibold text-lg group-hover:opacity-80 transition">
                    {service.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-[#7d4934]/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-[#7d4934]/40 rounded-full animate-pulse [animation-delay:1000ms]" />
      <div className="absolute bottom-1/4 left-16 w-1 h-1 bg-[#7d4934]/50 rounded-full animate-pulse [animation-delay:500ms]" />
    </section>
  );
};

export default HeroSection;
