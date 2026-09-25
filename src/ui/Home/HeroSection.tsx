import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import PillButton from "@/components/PillButton";

/*
  Palette (site brand: navy -> gold, matching the GJ logo's gold-on-dark)
  navy   #1e2f4d   left side of gradient, keeps white text readable
  ember  #8a5f10   warm midpoint between navy and gold
  gold   #d4a017   right side, behind the photo / accents
  gold-l #e9c766   light gold for small accents on dark
  ink    #0d0d0f   marquee bar, vignette
  paper  #f8f5ef   buttons and the strip that leads into the next section

  Needs once in index.html <head>:
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&display=swap" rel="stylesheet" />
  Photo: /public/Hero-1.jpeg
*/

const logos: { src: string; alt: string; className?: string }[] = [
  { src: "/logos/altior.png", alt: "Altior CRM" },
  { src: "/logos/workbrook.png", alt: "Workbrook" },
  { src: "/logos/gefyra.png", alt: "Gefyra" },
  { src: "/logos/sheddie.png", alt: "Sheddie" },
  { src: "/logos/mike-mike.png", alt: "Mike + Mike" },
  { src: "/logos/light-bearers.png", alt: "Light Bearers" },
  { src: "/logos/cornerstone.png", alt: "Cornerstone Christian Centre" },
  { src: "/logos/gd.png", alt: "GD" },
  { src: "/logos/the-mindful.png", alt: "The Mindful" },
];

const roles = [
  "Software Developer",
  "Technology Consultant",
  "Entrepreneur",
];

const line: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.55 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const reduce = useReducedMotion();
  const [replay, setReplay] = useState(0);
  const wasScrolled = useRef(false);

  // Replay the entrance animations whenever the user scrolls back to the top
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400) {
        wasScrolled.current = true;
      } else if (wasScrolled.current && window.scrollY < 10) {
        wasScrolled.current = false;
        setReplay((r) => r + 1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#1e2f4d] font-['Barlow_Condensed',sans-serif] text-white"
    >
      <style>{`
        @keyframes hero-marquee { to { transform: translateX(-50%); } }
        .hero-marquee { animation: hero-marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-marquee { animation: none; } }
      `}</style>

      {/* Navy -> gold gradient */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(105deg,#1e2f4d_0%,#8a5f10_45%,#d4a017_100%)]" />

      {/* Soft gold glow behind the headline for depth */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#d4a017]/15 blur-[140px]"
      />

      {/* Photo turned into a duotone: grayscale, then multiplied over the gradient */}
      <img
        src="/hero-2.jpeg"
        alt="Godfrey Joseph Sule"
        className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-[50%_18%] grayscale contrast-125 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,#000_38%)] lg:w-[62%]"
      />

      {/* Darkens the bottom so the marquee stays legible */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d0d0f]/50 via-transparent to-transparent" />

      <div key={replay} className="contents">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-36 pt-32 lg:px-10">
        {/* Roles */}
        <motion.p
          variants={rise}
          custom={0}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs uppercase tracking-[0.25em] text-white/60 sm:text-sm"
        >
          {roles.map((role, i) => (
            <span key={role} className="flex items-center gap-3">
              {role}
              {i < roles.length - 1 && (
                <span aria-hidden className="text-[#e9c766]">
                  •
                </span>
              )}
            </span>
          ))}
        </motion.p>

        <h1 className="text-[clamp(4.5rem,15vw,13rem)] font-bold uppercase leading-[0.82] tracking-tight">
          {["Godfrey", "Joseph"].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                custom={i}
                variants={line}
                initial={reduce ? false : "hidden"}
                animate="show"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={rise}
            custom={1}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="max-w-md font-sans"
          >
            <p className="text-2xl font-semibold leading-tight sm:text-3xl">
              I Build. <span className="text-[#e9c766]">I Teach.</span> I Guide.
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              I build digital products, help businesses use technology to solve
              real problems, teach what I learn, and share the journey of
              building technology and businesses.
            </p>
          </motion.div>

          <motion.div
            variants={rise}
            custom={2}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="flex flex-wrap items-center gap-3 font-sans"
          >
            <PillButton href="#contact" variant="solid" arrow>
              Work With Me
            </PillButton>
            <PillButton href="#projects" variant="outline">
              Explore My Work
            </PillButton>
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/25 text-white/60 transition-colors hover:border-white/60 hover:text-white lg:grid"
            >
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Brands and products marquee */}
      <div
        className="absolute inset-x-0 bottom-8 overflow-hidden border-y border-white/15 bg-[#0d0d0f]/45 py-4 backdrop-blur-md"
        aria-label="Companies and products Godfrey has built or worked on"
      >
        <div className="hero-marquee flex w-max items-center whitespace-nowrap">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`mr-20 w-auto object-contain ${logo.className ?? "h-12"}`}
            />
          ))}
        </div>
      </div>

      </div>

      {/* Paper strip that leads into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-8 rounded-t-[2rem] bg-[#f8f5ef] dark:bg-[#0d0d0f]" />
    </section>
  );
}
