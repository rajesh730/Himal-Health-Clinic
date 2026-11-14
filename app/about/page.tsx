import type { Metadata } from "next";
import {
  ArrowRight,
  Eye,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "About Our Clinic & Pharmacy in Bhaktapur",
  description:
    "Learn about Himal Health Clinic and its local healthcare and pharmacy services in Katunje, Bhaktapur.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Eye,
    title: "Clarity",
    text: "Patients should be able to understand services, schedules, costs and next steps without decoding medical language.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible information",
    text: "Credentials, medicine guidance and service claims should be accurate, current and easy to verify.",
  },
  {
    icon: HeartHandshake,
    title: "Respect",
    text: "Every patient deserves privacy, clear communication and respectful treatment.",
  },
  {
    icon: MapPinned,
    title: "Local access",
    text: "Healthcare is more useful when nearby families can find it, reach it and contact it easily.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageSchema
        title="About Himal Health Clinic"
        description="A local point of healthcare and medicine support in Katunje, Bhaktapur."
        path="/about"
        label="About"
      />
      <PageHero
        invert
        eyebrow="About Himal · Katunje"
        title="A local clinic built around clear, accessible care."
        description="Himal Health Clinic brings clinic information and pharmacy support together for patients in Katunje and nearby Bhaktapur communities."
      />
      <section className="image-feature-section">
        <div className="container image-feature image-feature--reverse">
          <figure className="image-feature__media">
            <img
              src="/images/consultation.webp"
              alt="Representative patient and doctor having a clear consultation"
              loading="lazy"
              decoding="async"
              width={1536}
              height={1024}
            />
            <figcaption>Representative consultation scene.</figcaption>
          </figure>
          <div>
            <span className="kicker">Care that feels understandable</span>
            <h2>Time, attention and clear explanations matter.</h2>
            <p>
              The clinic’s role is to help patients understand their concern,
              their options and the next practical step.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container about-lead">
          <span className="kicker">Our purpose</span>
          <h2>
            Make everyday healthcare easier to understand and easier to reach.
          </h2>
          <p>
            The clinic serves people looking for practical consultation, routine
            health support and convenient access to a pharmacy in the Katunje,
            Srijananagar and Sallaghari area. The website is deliberately
            direct: it explains the service, location and next step without
            exaggerated health promises.
          </p>
        </div>
      </section>
      <section className="section value-section">
        <div className="container numbered-grid">
          {values.map(({ icon: Icon, title, text }, index) => (
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
      </section>
      <section className="section">
        <div className="container editorial-callout">
          <span>Serving Bhaktapur</span>
          <h2>Katunje · Srijananagar · Sallaghari · Suryabinayak</h2>
          <Link className="button" href="/contact">
            View our location <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
