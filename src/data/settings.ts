export interface SiteSettings {
  contactEmail: string;
  whatsappNumber: string;
  socials: {
    github: string;
    youtube: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export const defaultSettings: SiteSettings = {
  contactEmail: "godfreyj.sule1@gmail.com",
  whatsappNumber: "2347019259834",
  socials: {
    github: "https://github.com/odafe32",
    youtube: "https://www.youtube.com/@OdafeGodfrey32",
    facebook: "https://web.facebook.com/godfrey.j.sule",
    instagram: "https://www.instagram.com/godfrey_joseph_",
    linkedin: "https://www.linkedin.com/in/godfrey-joseph-odafe-0992691a8/",
  },
};

export const socialLabels: Record<keyof SiteSettings["socials"], string> = {
  github: "GitHub",
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};
