export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  bio: string;
  photo: string;
}

export const defaultProfile: Profile = {
  name: "Godfrey Joseph Sule",
  title: "Full-Stack Software Engineer",
  tagline: "I Build. I Teach. I Guide.",
  location: "Abuja, Nigeria",
  bio: "Software developer, consultant and educator building products, teaching people and helping businesses grow through technology — through Kagayaki Global.",
  photo: "/odafe2.jpg",
};
