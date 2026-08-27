export interface FounderProfile {
  slug: string;
  name: string;
  title: string;
  bio: string;
  intro: string;
  tags: string[];
  highlights: { title: string; description: string }[];
  honors: { title: string; place: string; description: string }[];
  projectSlugs: string[];
  externalPortfolioUrl: string;
}

// V6 Solutions has six equal founders. Only one profile is complete and
// published so far — the rest are real people whose pages haven't been
// written yet. We show honest placeholders rather than invented bios.
export const TOTAL_FOUNDERS = 6;

export const founders: FounderProfile[] = [
  {
    slug: "shyamalan-v",
    name: "Shyamalan V",
    title: "Software Developer & Creative Technologist",
    bio: "Computer Science & Engineering undergraduate at SRM University, Ramapuram, specialising in Gaming Technology.",
    intro:
      "I build software, AI pipelines, AR/VR virtual spaces and interactive digital platforms that turn ambitious ideas into reality.",
    tags: ["AR / VR & Spatial Computing", "AI & Multi-Agent Systems", "Full-Stack Web Development"],
    highlights: [
      {
        title: "How I Think",
        description:
          "Engineering decisions are design decisions. The best products live at the intersection of robust code and intuitive interfaces — I don't just ship features, I craft experiences.",
      },
      {
        title: "What I Love",
        description:
          "Obsessing over micro-interactions, smooth 60fps animations, and cinematic moments on the web. Also deeply fascinated by multi-agent AI systems and spatial computing.",
      },
      {
        title: "What I'm Building",
        description:
          "Exploring stateful LangGraph agent pipelines, XR workshop simulations, and highly interactive frontend experiences. Currently in 3rd year — always learning, always shipping.",
      },
    ],
    honors: [
      {
        title: "Best Paper Award",
        place: "AstralThesis'26 & ICICRCET'25",
        description: "Awarded for the iLab XR Simulation training framework.",
      },
      {
        title: "Domain Prize — Hackxelerate'25",
        place: "KPRIET, Coimbatore · April 2025",
        description:
          "National 24-hour hackathon, 1,200+ students and 300+ teams — single-handedly designed and built a complete 3D college block as the technical anchor of the winning Smart Campus solution.",
      },
    ],
    projectSlugs: ["veritrust-ai", "bizpulse", "ilab-xr-simulation", "beaute-ai"],
    externalPortfolioUrl: "https://shyamalan.vercel.app/",
  },
];

export function getFounderBySlug(slug: string) {
  return founders.find((f) => f.slug === slug);
}
