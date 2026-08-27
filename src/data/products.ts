export interface Product {
  slug: string;
  name: string;
  status: "In Development";
  summary: string;
  problem: string;
  approach: string;
  note: string;
}

export const products: Product[] = [
  {
    slug: "ic-tester",
    name: "Low-Cost IC Tester",
    status: "In Development",
    summary:
      "Affordable electronics test equipment for checking whether an integrated circuit still works — built because we needed one ourselves and couldn't find one that didn't cost a fortune.",
    problem:
      "Commercial IC testers exist, but the good ones price out hobbyists, repair shops, small manufacturers and students — exactly the people who'd use one most often, in smaller batches.",
    approach:
      "We're an electronics and software team — this is the kind of tool we'd reach for ourselves, so we're building it in-house rather than waiting for someone else to.",
    note: "No specs, pricing or launch date yet — this is still an active build, not a finished product. We'd rather say that plainly than promise something before it's real.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
