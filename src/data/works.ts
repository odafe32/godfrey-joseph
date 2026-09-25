export interface Work {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  stack: string[];
  /** "#" renders as "Private Project" on the site. */
  link: string;
}

export const workCategories = [
  "Full-Stack & Mobile",
  "Full-Stack",
  "Web Development",
  "Mobile",
  "E-commerce",
  "Portfolio",
] as const;

export const defaultWorks: Work[] = [
  {
    id: "workbrook-website",
    title: "Workbrook Website",
    category: "Web Development",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1783155848/Screenshot_2026-07-04_100242_ehegmk.png",
    description: "Contributed to the marketing website for Workbrook, a workforce management platform. Built and shipped key pages and UI components, ensuring a polished, responsive, and production-ready experience.",
    stack: ["React", "TypeScript"],
    link: "https://workbrook.com/",
  },
  {
    id: "workbrook-app",
    title: "Workbrook App",
    category: "Full-Stack & Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771519269/ss_pdjcfj.png",
    description: "Contributed to the core web and mobile platform for Workbrook. Built full-stack features covering work management, team collaboration, and real-time productivity tools — shipped across both web and mobile.",
    stack: ["React", "React Native", "TypeScript"],
    link: "https://web.workbrook.com/",
  },
  {
    id: "mike-mike-partners",
    title: "Mike + MikePartners",
    category: "Full-Stack",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1781540857/ARCHITECT_2-33_uesjdp.jpg",
    description: "Built the full company website for a real estate and architectural firm. Includes property listings, service pages, team profiles, and project showcases — presenting the brand with clarity and professionalism.",
    stack: ["Laravel", "PHP"],
    link: "https://mikeandmikepartners.com/",
  },
  {
    id: "cornerstone-global",
    title: "Cornerstone Global",
    category: "Full-Stack & Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518859/cornerstone-app_wvsai3.png",
    description: "A comprehensive church management platform with web and mobile support. Built features for online giving, membership registration, devotionals, sermon access, and counselling — plus a full admin panel for church operations.",
    stack: ["Laravel", "React Native", "TypeScript", "Shadcn UI"],
    link: "https://cornerstoneglobal.org",
  },
  {
    id: "mindfulyouth-hub",
    title: "MindfulYouth Hub",
    category: "Full-Stack & Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518881/mindfulyouth_ycaqgt.png",
    description: "Built a creative and educational platform for young people. Delivered digital courses, coaching programmes, and goal-setting tools across web and mobile. Also handled logo design and full VPS deployment.",
    stack: ["Laravel", "React", "TypeScript"],
    link: "https://themindfulyouthhub.com/",
  },
  {
    id: "josephine-chibuike",
    title: "Josephine Chibuike",
    category: "Portfolio",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518877/josephine-portfolio2_z8i2j0.png",
    description: "Designed and built a professional portfolio site for a Brand Strategist and Virtual Assistant. Showcases her services, brand strategy work, and client experience — fully responsive and optimised for conversions.",
    stack: ["React", "Tailwind CSS"],
    link: "https://josephine-portfolio-one.vercel.app/",
  },
  {
    id: "gefyra-agency",
    title: "Gefyra Agency",
    category: "Web Development",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1783156355/Screenshot_2026-07-04_101204_bomdpo.png",
    description: "Built the website for Gefyra, a talent placement and consulting agency connecting skilled African professionals with growing businesses. Clean, modern design presenting the agency's services, process, and value with clarity.",
    stack: ["React", "Tailwind CSS"],
    link: "https://gefyra.agency/",
  },
  {
    id: "altior-crm",
    title: "Altior CRM",
    category: "Full-Stack",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1790253527/Screenshot_2026-09-24_133812_owms43.png",
    description: "A full customer relationship management system — contact and lead management, pipelines, and day-to-day business operations in one place.",
    stack: ["Laravel", "React", "TypeScript"],
    link: "https://altiorcrm.com/",
  },
  {
    id: "maseke-daniels-website",
    title: "Maseke Daniels Ministries",
    category: "Web Development",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1790253667/Screenshot_2026-09-24_134048_dmdnrd.png",
    description: "Official website for Maseke Daniels Ministries — ministry content, sermons, events, and resources presented with a polished, responsive experience.",
    stack: ["React", "Tailwind CSS"],
    link: "https://masekedanielsministries.org/",
  },
  {
    id: "maseke-daniels-app",
    title: "Maseke Daniels Ministries App",
    category: "Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1790253757/unnamed_ro7urg.webp",
    description: "The companion mobile app for Maseke Daniels Ministries — live on the Google Play Store, bringing sermons, devotionals, and ministry updates to members on the go.",
    stack: ["React Native", "TypeScript"],
    link: "https://play.google.com/store/apps/details?id=org.masekedaniel.ministries",
  },
  {
    id: "lightbearers",
    title: "Lightbearers",
    category: "Full-Stack",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771523658/Screenshot_2026-02-19_185409_dfjytz.png",
    description: "A faith-building platform for Christian families. Built daily devotionals, Bible-based affirmation cards, and spiritual resources tailored for toddlers and young children, helping parents nurture faith at home.",
    stack: ["React", "Vercel"],
    link: "https://lightbearers.vercel.app/",
  },
];
