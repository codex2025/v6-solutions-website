export interface PortfolioProject {
  slug: string;
  title: string;
  year: string;
  type: "Personal project";
  category: string;
  problem: string;
  solution: string;
  outcome: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "bizpulse",
    title: "Bizpulse",
    year: "2025",
    type: "Personal project",
    category: "IT & Software Development",
    problem:
      "Freelancers juggling GST-compliant invoicing, expense tracking and cash-flow forecasting usually stitch together several disconnected tools.",
    solution:
      "A full-stack SaaS platform in one place: automated GST invoicing, expense tracking and real-time cash-flow forecasting, running on a Dockerised Postgres/Redis/FastAPI/Next.js stack.",
    outcome:
      "A working platform with real-time revenue forecast charts and automated GST calculation.",
  },
  {
    slug: "ilab-xr-simulation",
    title: "iLab XR Simulation",
    year: "2025",
    type: "Personal project",
    category: "AR/VR & AI Solutions",
    problem:
      "Training people on hazardous mechanical workshop equipment is risky to do for real before they're ready.",
    solution:
      "An Extended Reality training framework built on Unity and Oculus hardware, simulating mechanical workshop equipment for safe, repeatable practice.",
    outcome: "Recognised with the Best Paper Award at AstralThesis'26 and ICICRCET'25.",
  },
  {
    slug: "veritrust-ai",
    title: "VeriTrust-AI",
    year: "2025",
    type: "Personal project",
    category: "AR/VR & AI Solutions",
    problem:
      "Developer credibility is scattered across platforms, with no single, explainable trust score to rely on.",
    solution:
      "A multi-agent scoring engine using stateful LangGraph pipelines to aggregate multi-platform data into a 0–100 Trust Score, with SHAP-style explainability so the score isn't a black box.",
    outcome:
      "A working engine with an interactive dashboard — SVG score gauges, threat indicators and transparent factor weighting.",
  },
  {
    slug: "beaute-ai",
    title: "Beaute-AI",
    year: "2024",
    type: "Personal project",
    category: "AR/VR & AI Solutions",
    problem:
      "Choosing a hairstyle or skincare routine online is mostly guesswork without a real consultation.",
    solution:
      'A salon directory with computer-vision face-shape scanning and a Gemini-powered conversational assistant ("Glowy") for structured beauty advice, plus an automated review summariser.',
    outcome:
      "A working platform combining facial geometry scanning with conversational AI consultation.",
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug);
}
