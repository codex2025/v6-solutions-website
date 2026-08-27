export type ServiceScope = "WORLDWIDE" | "INDIA";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  scope: ServiceScope;
  summary: string;
  whatsIncluded: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "it-software-development",
    title: "IT & Software Development",
    tagline: "Software built to spec, not to a template.",
    scope: "WORLDWIDE",
    summary:
      "Web apps, internal tools, and custom systems — designed, built and deployed by engineers who own the outcome, not just the code.",
    whatsIncluded: [
      "Custom web and internal applications",
      "API design and integration",
      "Database design and data migration",
      "Ongoing maintenance and support",
    ],
    process: [
      { title: "Scope", description: "We start by understanding what the software actually needs to do, not just what it should look like." },
      { title: "Build", description: "Iterative development with regular check-ins, not a black box until launch." },
      { title: "Test", description: "Manual and automated testing before anything ships." },
      { title: "Support", description: "Bug fixes and updates after launch, not a one-time handoff." },
    ],
    faqs: [
      { question: "Do you work with existing codebases?", answer: "Yes — we can extend, refactor or maintain software you already have, not just build from scratch." },
      { question: "What technologies do you use?", answer: "We choose the stack based on what the project needs, not a fixed template. Ask us directly about your specific requirements." },
    ],
  },
  {
    slug: "design-graphic-3d-visual",
    title: "Design — Graphic, 3D & Visual",
    tagline: "Visual identity and 3D work that looks like it belongs to you.",
    scope: "WORLDWIDE",
    summary:
      "Brand identity, graphic design, 3D renders and visual assets for products, marketing and presentations.",
    whatsIncluded: [
      "Brand identity and logo design",
      "3D product renders and visualisation",
      "Marketing and print graphics",
      "UI/UX visual design",
    ],
    process: [
      { title: "Brief", description: "We start with what the design needs to communicate, and to whom." },
      { title: "Concepts", description: "Multiple directions, not one option to accept or reject." },
      { title: "Refine", description: "Revisions based on your feedback until it's right." },
      { title: "Deliver", description: "Final files in the formats you actually need." },
    ],
    faqs: [
      { question: "Can you match an existing brand style?", answer: "Yes, we can work within brand guidelines you already have, or help build them from scratch." },
      { question: "Do you do 3D product renders for items that don't exist yet?", answer: "Yes — concept renders from specs or reference images are part of this service." },
    ],
  },
  {
    slug: "hardware-automation",
    title: "Hardware Automation",
    tagline: "Embedded systems and automation hardware, prototyped in-house.",
    scope: "INDIA",
    summary:
      "Design, prototyping and deployment of embedded systems and automation hardware for real industrial and business use.",
    whatsIncluded: [
      "Embedded systems design",
      "Automation hardware prototyping",
      "PCB design and sourcing",
      "Firmware development",
    ],
    process: [
      { title: "Define", description: "What needs to be automated, and why, before any hardware gets touched." },
      { title: "Prototype", description: "Working prototypes, tested in-house before anything scales." },
      { title: "Build", description: "Production units built to the validated design." },
      { title: "Deploy", description: "Installation and commissioning at your site." },
    ],
    faqs: [
      { question: "Do you build one-off prototypes or production runs?", answer: "Both — we scale from a single working prototype to small production runs as needed." },
      { question: "Where do you deploy hardware automation projects?", answer: "Currently on-site work is India-only, given the physical nature of installation and commissioning." },
    ],
  },
  {
    slug: "cctv-security-infrastructure",
    title: "CCTV & Security Infrastructure",
    tagline: "Installation and monitoring for sites across India.",
    scope: "INDIA",
    summary:
      "CCTV installation, network setup and monitoring infrastructure for shops, sites and facilities.",
    whatsIncluded: [
      "Site survey and camera placement planning",
      "CCTV installation and network setup",
      "Remote monitoring configuration",
      "Maintenance and support",
    ],
    process: [
      { title: "Survey", description: "We assess the site to plan coverage before installing anything." },
      { title: "Install", description: "Cameras, cabling and network setup done properly, not rushed." },
      { title: "Configure", description: "Remote access and monitoring set up and tested with you." },
      { title: "Support", description: "Ongoing maintenance so the system keeps working." },
    ],
    faqs: [
      { question: "Do you install CCTV outside Tamil Nadu?", answer: "Yes, across India — this is on-site physical work, so it's India-only for now." },
      { question: "Can I view footage remotely?", answer: "Yes, remote monitoring setup is part of the installation." },
    ],
  },
  {
    slug: "cad-engineering-drawings",
    title: "CAD & Engineering Drawings",
    tagline: "Precise drawings and models, ready for production.",
    scope: "WORLDWIDE",
    summary:
      "CAD models and engineering drawings for parts, assemblies and structures, delivered in the formats your production process needs.",
    whatsIncluded: [
      "2D engineering drawings",
      "3D CAD models",
      "Design-for-manufacturing review",
      "File conversion between CAD formats",
    ],
    process: [
      { title: "Requirements", description: "Tolerances, materials and standards, confirmed before drafting starts." },
      { title: "Model", description: "2D/3D CAD work built to spec." },
      { title: "Review", description: "Checked against manufacturing and assembly constraints." },
      { title: "Deliver", description: "Final files in your required format." },
    ],
    faqs: [
      { question: "What CAD software do you work in?", answer: "We can discuss the specific software and file formats you need before starting." },
      { question: "Can you convert drawings between formats?", answer: "Yes, format conversion is part of this service." },
    ],
  },
  {
    slug: "arvr-ai-solutions",
    title: "AR/VR & AI Solutions",
    tagline: "Immersive and intelligent experiences, built for real use cases.",
    scope: "WORLDWIDE",
    summary:
      "AR/VR experiences and AI-driven features built for real business use cases, not demos for their own sake.",
    whatsIncluded: [
      "AR/VR experience design and development",
      "AI feature integration",
      "Proof-of-concept builds",
      "Deployment across target devices",
    ],
    process: [
      { title: "Use case", description: "We start with the actual problem AR/VR or AI is meant to solve." },
      { title: "Prototype", description: "A working proof of concept before full development." },
      { title: "Build", description: "Full development against the validated concept." },
      { title: "Deploy", description: "Delivered to your target platforms and devices." },
    ],
    faqs: [
      { question: "Do you build AI features into existing software?", answer: "Yes, we can integrate AI capabilities into systems you already have." },
      { question: "What AR/VR platforms do you support?", answer: "Tell us your target devices and use case and we'll confirm feasibility." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Campaigns and strategy that reach the right audience.",
    scope: "WORLDWIDE",
    summary:
      "Digital marketing strategy and campaign execution across the channels that matter for your audience.",
    whatsIncluded: [
      "Marketing strategy and channel planning",
      "Campaign creation and management",
      "Content calendar and execution",
      "Performance reporting",
    ],
    process: [
      { title: "Audit", description: "Where you stand now, and where the actual opportunity is." },
      { title: "Strategy", description: "A plan built around your audience and budget, not a generic template." },
      { title: "Execute", description: "Campaigns launched and managed across the right channels." },
      { title: "Report", description: "Clear reporting on what worked, not vanity metrics." },
    ],
    faqs: [
      { question: "Which platforms do you manage campaigns on?", answer: "Tell us your audience and we'll recommend the right channels rather than defaulting to all of them." },
      { question: "Do you handle content creation too?", answer: "Yes, content calendar and creation is part of this service." },
    ],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    tagline: "Footage cut, graded and finished for release.",
    scope: "WORLDWIDE",
    summary:
      "Video editing, colour grading and finishing for marketing, product and social content.",
    whatsIncluded: [
      "Video editing and assembly",
      "Colour grading",
      "Motion graphics and titles",
      "Delivery in platform-specific formats",
    ],
    process: [
      { title: "Brief", description: "What the video needs to do, and where it will run." },
      { title: "Edit", description: "Assembly and rough cut for your review." },
      { title: "Finish", description: "Colour grading, sound and motion graphics." },
      { title: "Deliver", description: "Exported in the formats each platform needs." },
    ],
    faqs: [
      { question: "Can you work with footage we already shot?", answer: "Yes, editing existing footage is the most common version of this service." },
      { question: "Do you handle multiple export formats for different platforms?", answer: "Yes, delivery in platform-specific formats is included." },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getAdjacentService(slug: string) {
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) return null;
  return services[(index + 1) % services.length];
}
