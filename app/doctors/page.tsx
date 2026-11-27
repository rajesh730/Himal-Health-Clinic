import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
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
        title="Know who is available before you visit"
        description="Doctor schedules can change. Confirm the current clinician and consultation time before travelling to the Katunje clinic."
      />
      <section className="image-feature-section image-feature-section--compact">
        <div className="container image-feature image-feature--text-only">
          <div>
            <span className="kicker">Care through communication</span>
            <h2>Good consultation starts with listening</h2>
            <p>
              Bring your questions, current medicines and recent health
              information so the clinician can understand the situation clearly.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <div className="doctor-roster">
            <div className="doctor-roster__head" aria-hidden="true">
              <span>Doctor</span>
              <span>Specialty</span>
              <span>Registration</span>
            </div>
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.registration}>
                <div className="doctor-card__main">
                  <h2>{doctor.name}</h2>
                  <p className="doctor-card__credentials">
                    {doctor.credentials} · {doctor.hospital}
                  </p>
                </div>
                <p className="doctor-card__specialty">{doctor.specialty}</p>
                <p className="doctor-card__reg time">{doctor.registration}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container content-grid">
          <div>
            <span className="kicker">Patient trust</span>
            <h2>Doctor profiles should contain facts, not marketing claims</h2>
          </div>
          <div>
            <p>
              Each published profile should include the doctor’s full name,
              qualification, specialty, Nepal Medical Council registration
              number and current schedule. These details must be verified before
              they appear on the website.
            </p>
            <Link className="button" href="/contact">
              Confirm today’s schedule <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-callout">
          <span>Planning a visit?</span>
          <h2>Tell the clinic which type of doctor you need</h2>
          <Link className="button" href="/clinic-services">
            Review clinic services <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
