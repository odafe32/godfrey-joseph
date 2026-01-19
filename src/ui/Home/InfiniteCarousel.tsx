import React from 'react';

interface Brand {
  name: string;
  logo: string;
  variant: 'light' | 'dark';
}

const InfiniteLogoCarousel: React.FC = () => {
  // Add your actual brand logo images here
  const brands: Brand[] = [
    {
      name: "Blox",
      logo: "/branne.png",
      variant: "light"
    },
    {
      name: "Ultra Blox", 
      logo: "/logos/ultra-blox.png",
      variant: "dark"
    },
    {
      name: "Frame Blox",
      logo: "/logos/frame-blox.png", 
      variant: "dark"
    },
    {
      name: "Ship Blox",
      logo: "/logos/ship-blox.png",
      variant: "dark"
    },
    {
      name: "Supa Blox",
      logo: "/logos/supa-blox.png",
      variant: "light"
    },
    {
      name: "Tech Corp",
      logo: "/logos/tech-corp.png",
      variant: "dark"
    },
    {
      name: "Design Studio",
      logo: "/logos/design-studio.png",
      variant: "light"
    },
    {
      name: "Innovation Lab",
      logo: "/logos/innovation-lab.png",
      variant: "dark"
    }
  ];

  // Duplicate the array to create seamless infinite loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#7d4934]/80 text-sm sm:text-base font-medium tracking-wide uppercase mb-3 animate-[fadeInUp_1s_ease-out]">
            Trusted by Industry Leaders & Partners
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 animate-[fadeInUp_1s_ease-out] [animation-delay:0.2s] [animation-fill-mode:both]">
            Brands I've Helped Shape
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7d4934] to-amber-600 mx-auto mt-4 rounded-full animate-[fadeInUp_1s_ease-out] [animation-delay:0.4s] [animation-fill-mode:both]" />
        </div>

        {/* Single Infinite Carousel */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="flex animate-[slideLeft_30s_linear_infinite] hover:[animation-play-state:paused] w-[4000px]">
            {duplicatedBrands.map((brand: Brand, index: number) => (
              <div key={`${brand.name}-${index}`} className="w-[300px] flex-shrink-0">
                <div className="flex items-center justify-center h-24 sm:h-28 lg:h-32 mx-4">
                  <div className="group cursor-pointer relative transition-all duration-300 hover:translate-y-[-5px] hover:scale-105 hover:brightness-110">
                    {/* Logo Container */}
                    <div className="w-40 h-20 bg-white flex items-center justify-center relative overflow-hidden">
                      {/* Logo Image */}
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7d4934]/10 to-amber-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Brand Name on Hover */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-[#7d4934] whitespace-nowrap opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#7d4934]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-amber-600/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#7d4934]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <style>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(125, 73, 52, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(125, 73, 52, 0.2);
          }
        }
      `}</style>
    </section>
  );
};

export default InfiniteLogoCarousel;