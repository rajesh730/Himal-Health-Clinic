import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  Pill,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { InteractiveTrust } from "@/components/interactive-trust";
import { ContactBand } from "@/components/site-shell";
import { blogPosts } from "@/lib/blog";
import {
  clinicServices,
  localAreas,
  openingHours,
  phonesE164,
  postalAddress,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinic & Pharmacy in Katunje, Bhaktapur",
  description:
    "Local clinic and pharmacy in Katunje, Bhaktapur, close to Srijananagar and Sallaghari. View clinic services, pharmacy information and contact details.",
  alternates: { canonical: "/" },
};

const faq = [
  {
    q: "Where is Himal Health Clinic located?",
    a: "The clinic and pharmacy are in Katunje, Bhaktapur, close to Srijananagar and Sallaghari. Check the contact page for the area map and confirmed visiting details.",
  },
  {
    q: "Are clinic and pharmacy services available in one place?",
    a: "Yes. The website presents the clinic and in-house pharmacy as connected services at the same local location.",
  },
  {
    q: "Should I confirm the doctor schedule before visiting?",
    a: "Yes. Visiting specialists, tests and vaccination availability can change, so confirm the current schedule before travelling.",
  },
  {
    q: "Does the clinic provide emergency care?",
    a: "No emergency service is advertised. For severe or life-threatening symptoms, go directly to the nearest emergency department.",
  },
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en-NP",
        publisher: { "@id": `${site.url}/#clinic` },
      },
      {
        "@type": "MedicalClinic",
        "@id": `${site.url}/#clinic`,
        name: site.name,
        alternateName: "Himal Health Clinic & Pharmacy",
        url: site.url,
        description:
          "A local clinic and in-house pharmacy serving Katunje, Srijananagar, Sallaghari and nearby Bhaktapur communities.",
        hasMap: site.mapUrl,
        medicalSpecialty: "PrimaryCare",
        logo: `${site.url}${site.logo}`,
        image: `${site.url}${site.ogImage}`,
        telephone: phonesE164,
        currenciesAccepted: "NPR",
        address: {
          ...postalAddress,
          "@id": `${site.url}/#clinic-address`,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...openingHours.days],
            opens: openingHours.opens,
            closes: openingHours.closes,
          },
        ],
        areaServed: localAreas.map((name) => ({ "@type": "Place", name })),
        availableService: clinicServices.map((service) => ({
          "@type": "MedicalProcedure",
          name: service.title,
          description: service.text,
        })),
        department: { "@id": `${site.url}/#pharmacy` },
      },
      {
        "@type": "Pharmacy",
        "@id": `${site.url}/#pharmacy`,
        name: "Himal Pharmacy",
        url: `${site.url}/pharmacy`,
        description: "In-house pharmacy support in Katunje, Bhaktapur.",
        address: { "@id": `${site.url}/#clinic-address` },
        telephone: phonesE164,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...openingHours.days],
            opens: openingHours.opens,
            closes: openingHours.closes,
          },
        ],
        parentOrganization: { "@id": `${site.url}/#clinic` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <span className="kicker kicker--light">Katunje · Bhaktapur</span>
            <h1>Clinic and pharmacy care in Katunje, Bhaktapur.</h1>
            <p>
              Clear consultations, practical health support and convenient
              access to medicines—close to Srijananagar and Sallaghari.
            </p>
            <div className="action-row">
              <Link className="button button--light" href="/clinic-services">
                Explore clinic services <ArrowRight size={18} />
              </Link>
              <Link className="button button--outline-light" href="/contact">
                <MapPin size={18} /> Find us
              </Link>
            </div>
            <div className="hero-proof">
              <span>
                <Stethoscope size={18} /> Clinic information
              </span>
              <span>
                <Pill size={18} /> In-house pharmacy
              </span>
              <span>
                <Clock3 size={18} /> {site.hours}
              </span>
            </div>
          </div>
          <figure className="hero-media">
            <div className="hero-media__label">
              <span>01</span> Local care
            </div>
            {/* Largest Contentful Paint element — fetched eagerly at high
                priority rather than lazily. */}
            <img
              src="/images/clinic-interior.webp"
              alt="Representative bright and welcoming neighbourhood clinic interior"
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              A calm, welcoming environment for everyday care. Representative
              image.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip__grid">
          <span className="kicker">What patients need first</span>
          <h2>Clear services. Simple directions.</h2>
          <p>
            Everything is organised so patients can understand what is
            available, confirm a schedule and find the clinic without
            unnecessary searching.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">Clinic services</span>
              <h2 id="services-title">Everyday healthcare in Katunje</h2>
            </div>
            <Link className="text-link" href="/clinic-services">
              View all clinic information <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="numbered-grid">
            {clinicServices.map(({ icon: Icon, title, text }, index) => (
              <article className="numbered-card" key={title}>
                <div className="numbered-card__top">
                  <span>0{index + 1}</span>
                  <Icon size={25} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--dark"
        aria-labelledby="pharmacy-title"
      >
        <div className="container split-feature">
          <div className="split-feature__intro">
            <span className="kicker kicker--light">Pharmacy in Katunje</span>
            <h2 id="pharmacy-title">Medicine support without another stop.</h2>
            <figure className="section-illustration" aria-hidden="true">
              <span className="section-illustration__orbit" />
              <img
                src="/images/illustration-pharmacy.webp"
                alt=""
                loading="lazy"
                decoding="async"
                width={1254}
                height={1254}
              />
            </figure>
          </div>
          <div>
            <p>
              Visit the in-house pharmacy after your consultation or contact the
              team to check medicine availability before travelling from
              Srijananagar, Sallaghari or elsewhere in Bhaktapur.
            </p>
            <Link className="button button--light" href="/pharmacy">
              Explore pharmacy services <ArrowRight size={18} />
            </Link>
            <figure className="inline-photo">
              <img
                src="/images/pharmacy.webp"
                alt="Representative organised neighbourhood pharmacy"
                loading="lazy"
                decoding="async"
                width={1536}
                height={1024}
              />
              <figcaption>Representative pharmacy environment.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="trust-title">
        <div className="container">
          <div className="section-heading section-heading--stacked">
            <span className="kicker">Designed around trust</span>
            <h2 id="trust-title">
              Healthcare information should be easy to verify.
            </h2>
          </div>
          <InteractiveTrust />
        </div>
      </section>

      <section className="section blog-section" aria-labelledby="blog-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">Health blog</span>
              <h2 id="blog-title">Practical guidance for everyday health.</h2>
            </div>
            <Link className="text-link" href="/blog">
              View all articles <ArrowUpRight size={17} />
            </Link>
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
                  <h3>
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link className="text-link" href={post.href}>
                    Read article <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-section" aria-labelledby="areas-title">
        <div className="container local-grid">
          <div className="local-copy">
            <span className="kicker">Areas we serve</span>
            <h2 id="areas-title">Care close to home.</h2>
            <p>
              Convenient local healthcare for families across Katunje and the
              surrounding Bhaktapur communities.
            </p>
          </div>
          <div className="local-areas">
            <span>Serving nearby communities</span>
            <div className="area-list">
              {localAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
            <Link className="text-link" href="/contact">
              View location and directions <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div>
            <span className="kicker">Common questions</span>
            <h2 id="faq-title">Before you visit</h2>
          </div>
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
