import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Health Blog for Bhaktapur Patients",
  description:
    "Plain-language health articles from Himal Health Clinic for patients and families in Katunje and Bhaktapur.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageSchema
        title="Health Blog for Bhaktapur Patients"
        description="Plain-language health and medicine guidance for patients in Katunje and Bhaktapur."
        path="/blog"
        label="Health Blog"
      />
      <PageHero
        invert
        eyebrow="Health blog · Bhaktapur"
        title="Clear health information for everyday decisions."
        description="Practical articles about preparing for appointments, using medicines responsibly and building healthier daily routines."
      />
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--stacked">
            <span className="kicker">Latest articles</span>
            <h2>Useful guidance, written in plain language.</h2>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <Link
                  className="blog-card__media"
                  href={post.href}
                  aria-label={`Read ${post.title}`}
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={1254}
                    height={1254}
                  />
                </Link>
                <div className="blog-card__copy">
                  <div className="blog-card__meta">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2>
                    <Link href={post.href}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <Link className="text-link" href={post.href}>
                    Read article <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="blog-note">
            <BookOpen size={24} />
            <p>
              Articles provide general education only. Personal medical
              decisions require advice from a qualified health professional who
              understands your situation.
            </p>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
