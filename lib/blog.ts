export type BlogPost = {
  slug: string;
  href: string;
  category: string;
  title: string;
  excerpt: string;
  description: string;
  datePublished: string;
  dateLabel: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "prepare-for-doctor-visit",
    href: "/blog/prepare-for-doctor-visit",
    category: "Clinic visit",
    title: "How to prepare for a doctor visit",
    excerpt: "A simple checklist can help you explain your concern clearly and make better use of consultation time.",
    description: "A practical checklist for preparing for a doctor consultation in Katunje, Bhaktapur, including symptoms, medicines, allergies and questions.",
    datePublished: "2026-08-27",
    dateLabel: "27 August 2026",
    readTime: "4 min read",
    image: "/images/illustration-consultation.webp",
    imageAlt: "Illustration of a calm conversation between a clinician and patient",
  },
  {
    slug: "medicine-safety-questions",
    href: "/blog/medicine-safety-questions",
    category: "Pharmacy guidance",
    title: "Medicine safety: questions worth asking",
    excerpt: "Before leaving the pharmacy, understand what the medicine is for, how to use it and which precautions matter.",
    description: "Plain-language medicine safety questions to discuss with a qualified pharmacist or doctor in Bhaktapur.",
    datePublished: "2026-08-27",
    dateLabel: "27 August 2026",
    readTime: "4 min read",
    image: "/images/illustration-pharmacy.webp",
    imageAlt: "Illustration of a pharmacist giving responsible medicine guidance",
  },
  {
    slug: "everyday-health-habits",
    href: "/blog/everyday-health-habits",
    category: "Preventive health",
    title: "Everyday habits that support long-term health",
    excerpt: "Regular movement and a balanced, varied diet are practical foundations for protecting health over time.",
    description: "Evidence-based everyday health habits covering physical activity and healthy eating for adults and families in Bhaktapur.",
    datePublished: "2026-08-27",
    dateLabel: "27 August 2026",
    readTime: "5 min read",
    image: "/images/illustration-heart-health.webp",
    imageAlt: "Illustration representing heart health and preventive care",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)!;
}
