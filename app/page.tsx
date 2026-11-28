import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { ScheduleBoard } from "@/components/schedule-board";
import { HeroRidge } from "@/components/hero-ridge";
import { ContactBand, EmergencyCallout } from "@/components/site-shell";
import { TrustPoints } from "@/components/trust-points";
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
    a: "Yes. Choose from the available doctor times online, then send an appointment request. The clinic still needs to confirm the request before it is booked.",
  },
  {
    q: "Does the clinic provide emergency care?",
    a: `Yes. Himal Health Clinic provides emergency services. For urgent medical problems, call ${site.phones.join(" or ")} straight away so the team can prepare for your arrival.`,
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
        availableService: [
          {
            "@type": "MedicalProcedure",
            name: "Emergency services",
            description:
              "Emergency medical services. Call the clinic straight away for urgent problems.",
          },
          ...clinicServices.map((service) => ({
            "@type": "MedicalProcedure",
            name: service.title,
            description: service.text,
          })),
        ],
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
            <span className="hero-kicker">
              <Clock3 size={16} aria-hidden="true" />
              <span className="time">{site.hours}</span>
            </span>
            <h1>Clinic and pharmacy care in Katunje, Bhaktapur</h1>
            <p>
              General and specialist consultations, routine health checks and
              an in-house pharmacy under one roof, close to Srijananagar and
              Sallaghari.
            </p>
            <div className="action-row">
              <Link className="button button--on-brand" href="/book">
                <CalendarDays size={16} /> Book an appointment
              </Link>
              <Link className="button button--ghost-on-brand" href="/clinic-services">
                Explore clinic services <ArrowRight size={16} />
              </Link>
              <Link className="button button--ghost-on-brand" href="/contact">
                <MapPin size={16} /> Find us
              </Link>
            </div>
          </div>
          {/* Largest Contentful Paint element: fetched eagerly. */}
          <figure className="hero-photo">
            <img
              src="/images/himal-clinic-owner.jpeg"
              alt="The owner of Himal Health Clinic smiling at the clinic desk, with a patient monitor and health charts on the wall"
              width={1200}
              height={1600}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>Clinic owner at the Himal Health Clinic desk</figcaption>
          </figure>
        </div>
        <HeroRidge />
      </section>

      <div className="board-band">
        <div className="container">
          <ScheduleBoard />
        </div>
      </div>

      <EmergencyCallout />

      <section className="section" aria-labelledby="intro-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">What patients need first</span>
              <h2 id="intro-title">Clear services, simple directions</h2>
            </div>
            <p>Three quick steps from home to the consultation room.</p>
          </div>

          <ol className="intro-steps">
            <li>
              <Link className="intro-step" href="/clinic-services">
                <span className="intro-step__top">
                  <span className="intro-step__num">Step 1</span>
                  <Stethoscope size={18} aria-hidden="true" />
                </span>
                <h3>See what we offer</h3>
                <p>
                  Consultations, tests, vaccinations and an in-house pharmacy
                  under one roof.
                </p>
                <span className="intro-step__cta">
                  Browse services <ArrowRight size={16} />
                </span>
              </Link>
            </li>
            <li>
              <Link className="intro-step" href="/book">
                <span className="intro-step__top">
                  <span className="intro-step__num">Step 2</span>
                  <CalendarDays size={18} aria-hidden="true" />
                </span>
                <h3>Request an appointment</h3>
                <p>
                  Select a doctor, a free time and your details. The clinic will
                  confirm your request.
                </p>
                <span className="intro-step__meta">
                  <Clock3 size={16} aria-hidden="true" />
                  <span className="time">Free times shown live</span>
                </span>
                <span className="intro-step__cta">
                  Book online <ArrowRight size={16} />
                </span>
              </Link>
            </li>
            <li>
              <Link className="intro-step" href="/contact">
                <span className="intro-step__top">
                  <span className="intro-step__num">Step 3</span>
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <h3>Find the clinic</h3>
                <p>
                  Ward No. 5, Katunje, close to Srijananagar and Sallaghari.
                </p>
                <span className="intro-step__cta">
                  Get directions <ArrowRight size={16} />
                </span>
              </Link>
            </li>
          </ol>
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
              View all clinic information <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="feature-grid">
            {clinicServices.map(({ icon: Icon, title, text }) => (
              <article className="feature" key={title}>
                <Icon size={18} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="pharmacy-title"
      >
        <div className="container split-feature">
          <div className="split-feature__intro">
            <span className="kicker">Pharmacy in Katunje</span>
            <h2 id="pharmacy-title">Medicine support without another stop</h2>
            <p>
              Visit the in-house pharmacy after your consultation or contact the
              team to check medicine availability before travelling from
              Srijananagar, Sallaghari or elsewhere in Bhaktapur.
            </p>
            <Link className="button" href="/pharmacy">
              Explore pharmacy services <ArrowRight size={16} />
            </Link>
          </div>
          <figure className="inline-photo">
            <img
              src="/images/pharmacy.webp"
              alt="Representative organised neighbourhood pharmacy"
              loading="lazy"
              decoding="async"
              width={1536}
              height={1024}
            />
            <figcaption>Representative pharmacy environment</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="trust-title">
        <div className="container">
          <div className="section-heading section-heading--stacked">
            <span className="kicker">Trust</span>
            <h2 id="trust-title">
              Healthcare information should be easy to verify
            </h2>
          </div>
          <TrustPoints />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="blog-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">Health blog</span>
              <h2 id="blog-title">Practical guidance for everyday health</h2>
            </div>
            <Link className="text-link" href="/blog">
              View all articles <ArrowUpRight size={16} />
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
                    Read article <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="areas-title">
        <div className="container local-grid">
          <div className="local-copy">
            <span className="kicker">Areas we serve</span>
            <h2 id="areas-title">Care close to home</h2>
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
              View location and directions <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
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
