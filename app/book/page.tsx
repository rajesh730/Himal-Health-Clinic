import type { Metadata } from "next";
import { CalendarDays, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";
import { clinicnp } from "@/lib/clinicnp";
import type { DoctorsResponse } from "@/lib/booking-types";
import { doctors, phonesE164, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Doctor Appointment",
  description:
    "Request a doctor appointment at Himal Health Clinic in Katunje, Bhaktapur. Choose a doctor and a free time online.",
  alternates: { canonical: "/book" },
};

type BookingPageProps = {
  searchParams: Promise<{ doctor?: string | string[] }>;
};

/** The website's usual schedule is keyed by the ClinicNP doctor id. */
const doctorNotes = Object.fromEntries(
  doctors.map((doctor) => [doctor.clinicnpId, { schedule: doctor.schedule }]),
);

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const [{ data }, params] = await Promise.all([
    clinicnp<DoctorsResponse>("/doctors"),
    searchParams,
  ]);
  const requestedDoctor =
    typeof params.doctor === "string" ? params.doctor : undefined;

  return (
    <>
      <PageSchema
        title="Book a Doctor Appointment"
        description="Request an appointment at Himal Health Clinic in Katunje, Bhaktapur."
        path="/book"
        label="Book appointment"
      />
      <PageHero
        eyebrow="Online appointment request"
        title="Choose a doctor and request a time"
        description="Available times come directly from the clinic system. Your request is confirmed only when the clinic accepts it."
      />
      <section className="section booking-section">
        <div className="container booking-layout">
          <aside className="booking-intro">
            <span className="kicker">How online booking works</span>
            <h2>Send a request in two simple steps</h2>
            <ol className="booking-expectations">
              <li>
                <span>1</span>
                <div>
                  <strong>Choose a free time</strong>
                  <p>Select a doctor, date and an available 15-minute slot.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Receive your booking code</strong>
                  <p>Keep it to check the request while the clinic confirms it.</p>
                </div>
              </li>
            </ol>
            <div className="booking-intro__note">
              <CalendarDays size={18} aria-hidden="true" />
              <p>
                Do not use online booking for an emergency. Call the clinic
                straight away for urgent care.
              </p>
            </div>
            <a className="text-link" href={`tel:${phonesE164[0]}`}>
              <Phone size={16} aria-hidden="true" /> Call {site.phones[0]}
            </a>
          </aside>
          <BookingForm
            initial={data}
            initialDoctorId={requestedDoctor}
            notes={doctorNotes}
            phone={{ display: site.phones[0], tel: phonesE164[0] }}
          />
        </div>
      </section>
    </>
  );
}
