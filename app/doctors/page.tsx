import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, CalendarDays } from "lucide-react";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";
import { doctors, postalAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Doctors in Katunje, Bhaktapur",
  description:
    "Find doctor and visiting specialist information for Himal Health Clinic in Katunje, Bhaktapur.",
  alternates: { canonical: "/doctors" },
};

// Each clinician is published as a `Physician` tied to the clinic entity, so
// search engines can associate the specialty and NMC registration with the
// practice rather than treating the roster as loose text.
const rosterSchema = {
  "@context": "https://schema.org",
  "@graph": doctors.map((doctor) => ({
    "@type": "Physician",
    "@id": `${site.url}/doctors/#${doctor.registration.replace(/\W+/g, "-").toLowerCase()}`,
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    identifier: doctor.registration,
    address: postalAddress,
    worksFor: { "@id": `${site.url}/#clinic` },
    memberOf: { "@type": "MedicalOrganization", name: doctor.hospital },
  })),
};

export default function DoctorsPage() {
  return (
    <>
      <PageSchema
        title="Doctors in Katunje, Bhaktapur"
        description="Doctor and visiting specialist information for Himal Health Clinic in Katunje, Bhaktapur."
        path="/doctors"
        label="Doctors"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rosterSchema) }}
      />
      <PageHero
        eyebrow="Medical team · Bhaktapur"
        title="Know who is available before you visit."
        description="Doctor schedules can change. Confirm the current clinician and consultation time before travelling to the Katunje clinic."
      />
      <section className="image-feature-section image-feature-section--compact">
        <div className="container image-feature image-feature--text-only">
          <div>
            <span className="kicker">Care through communication</span>
            <h2>Good consultation starts with listening.</h2>
            <p>
              Bring your questions, current medicines and recent health
              information so the clinician can understand the situation clearly.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container doctor-roster">
          {doctors.map((doctor, index) => (
            <article className="doctor-card" key={doctor.name}>
              <div className="doctor-card__number">0{index + 1}</div>
              <div className="doctor-card__main">
                <span className="kicker">{doctor.specialty}</span>
                <h2>{doctor.name}</h2>
                <p className="doctor-card__credentials">
                  {doctor.credentials} · {doctor.hospital}
                </p>
                <div className="role-meta">
                  <span>
                    <CalendarDays size={17} /> {doctor.schedule}
                  </span>
                  <span>
                    <BadgeCheck size={17} /> {doctor.registration}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section--dark">
        <div className="container content-grid">
          <div>
            <span className="kicker kicker--light">Patient trust</span>
            <h2>Doctor profiles should contain facts, not marketing claims.</h2>
          </div>
          <div>
            <p>
              Each published profile should include the doctor’s full name,
              qualification, specialty, Nepal Medical Council registration
              number and current schedule. These details must be verified before
              they appear on the website.
            </p>
            <Link className="button button--light" href="/contact">
              Confirm today’s schedule <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-callout">
          <span>Planning a visit?</span>
          <h2>Tell the clinic which type of doctor you need.</h2>
          <Link className="button" href="/clinic-services">
            Review clinic services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
