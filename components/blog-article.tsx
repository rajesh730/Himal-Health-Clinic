import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { site } from "@/lib/site";

export function BlogArticle({ post, children }: { post: BlogPost; children: ReactNode }) {
  const url = `${site.url}${post.href}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}/#article`,
        headline: post.title,
        description: post.description,
        image: `${site.url}${post.image}`,
        datePublished: post.datePublished,
        dateModified: post.datePublished,
        inLanguage: "en-NP",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: site.name, url: site.url },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        about: { "@id": `${site.url}/#clinic` },
        breadcrumb: { "@id": `${url}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Health Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="blog-article">
        <header className="blog-article__header">
          <div className="container blog-article__header-grid">
            <div>
              <Link className="text-link" href="/blog"><ArrowLeft size={17} /> All health articles</Link>
              <span className="kicker">{post.category}</span>
              <h1>{post.title}</h1>
              <p>{post.excerpt}</p>
              <div className="blog-meta"><span>{post.dateLabel}</span><span>{post.readTime}</span></div>
            </div>
            <figure className="blog-article__visual"><img src={post.image} alt={post.imageAlt} width={1254} height={1254} /><figcaption>Health education illustration.</figcaption></figure>
          </div>
        </header>
        <div className="container blog-article__body">
          <div className="blog-copy">{children}</div>
          <aside className="blog-disclaimer"><strong>Important</strong><p>This article provides general health information. It does not replace an individual assessment, diagnosis or treatment from a qualified health professional.</p><Link className="button" href="/contact">Contact the clinic <ArrowRight size={17} /></Link></aside>
        </div>
      </article>
    </>
  );
}
