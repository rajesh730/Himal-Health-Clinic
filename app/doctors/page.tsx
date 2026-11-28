import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";
import type { BookingDoctor, DoctorsResponse } from "@/lib/booking-types";
import { clinicnp } from "@/lib/clinicnp";
import { doctors as websiteDoctors, postalAddress, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Doctors in Katunje, Bhaktapur",
  description:
    "Find current doctor and visiting specialist information for Himal Health Clinic in Katunje, Bhaktapur.",
  alternates: { canonical: "/doctors" },
};

type WebsiteDoctor = (typeof websiteDoctors)[number];

/**
 * ClinicNP is the live source for the public roster. The website's verified
 * NMC registration and hospital details are supplementary and are joined by
 * ClinicNP id, never by a doctor name that could be spelled differently.
 */
const websiteDoctorByClinicId = new Map<string, WebsiteDoctor>(
  websiteDoctors.map((doctor) => [doctor.clinicnpId, doctor]),
);

function rosterSchema(doctors: BookingDoctor[]) {
  return {
    "@context": "https://schema.org",
    "@graph": doctors.map((doctor) => {
      const websiteDoctor = websiteDoctorByClinicId.get(doctor.id);
      return {
        "@type": "Physician",
        "@id": `${site.url}/doctors/#${doctor.id}`,
        name: doctor.name,
        medicalSpecialty: doctor.specialty,
        ...(websiteDoctor?.registration
          ? { identifier: websiteDoctor.registration }
          : {}),
        address: postalAddress,
        worksFor: { "@id": `${site.url}/#clinic` },
        ...(websiteDoctor?.hospital
          ? {
              memberOf: {
                "@type": "MedicalOrganization",
                name: websiteDoctor.hospital,
              },
            }
          : {}),
      };
    }),
  };
}

export default async function DoctorsPage() {
  const { data } = await clinicnp<DoctorsResponse>("/doctors");
  const liveDoctors = data.ok ? data.doctors : [];
  const bookingOpen = data.ok && data.accepting;

  return (
    <>
      <PageSchema
        title="Doctors in Katunje, Bhaktapur"
        description="Current doctor and visiting specialist information for Himal Health Clinic in Katunje, Bhaktapur."
        path="/doctors"
        label="Doctors"
      />
      {data.ok ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rosterSchema(liveDoctors)) }}
        />
      ) : null}
      <PageHero
        eyebrow="Medical team · Bhaktapur"
        title="Know who is available before you visit"
        description="This roster comes directly from the clinic booking system. Specialist availability can change, so choose a free time before travelling."
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
          {data.ok ? (
            <div className="doctor-roster">
              <div className="doctor-roster__head" aria-hidden="true">
                <span>Doctor</span>
                <span>Specialty</span>
                <span>Registration</span>
                <span>Appointment</span>
              </div>
              {liveDoctors.map((doctor) => {
                const websiteDoctor = websiteDoctorByClinicId.get(doctor.id);
                const credentials = [doctor.qualification, websiteDoctor?.hospital]
                  .filter(Boolean)
                  .join(" · ");

                return (
                  <article className="doctor-card" key={doctor.id}>
                    <div className="doctor-card__main">
                      <h2>{doctor.name}</h2>
                      {credentials ? (
                        <p className="doctor-card__credentials">{credentials}</p>
                      ) : null}
                    </div>
                    <div>
                      <p className="doctor-card__specialty">{doctor.specialty}</p>
                      {websiteDoctor?.schedule ? (
                        <p className="doctor-card__schedule time">
                          Usually: {websiteDoctor.schedule}
                        </p>
                      ) : null}
                    </div>
                    <p className="doctor-card__reg time">
                      {websiteDoctor?.registration ?? "—"}
                    </p>
                    {bookingOpen ? (
                      <Link
                        className="text-link doctor-card__book"
                        href={`/book?doctor=${encodeURIComponent(doctor.id)}`}
                      >
                        Request time <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <span className="doctor-card__paused">Booking paused</span>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="doctor-roster__notice" role="status">
              <h2>Current doctor information is unavailable just now</h2>
              <p>
                Please phone the clinic to confirm today’s doctor availability
                before travelling.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="section section--tint">
        <div className="container content-grid">
          <div>
            <span className="kicker">Patient trust</span>
            <h2>Current roster information from the clinic</h2>
          </div>
          <div>
            <p>
              Names, qualifications and specialties above are supplied by the
              clinic’s booking system. Website-only registration and hospital
              details are shown only where the clinic has verified a matching
              doctor record.
            </p>
            <Link className="button" href={bookingOpen ? "/book" : "/contact"}>
              {bookingOpen ? "Book an appointment" : "Contact the clinic"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
