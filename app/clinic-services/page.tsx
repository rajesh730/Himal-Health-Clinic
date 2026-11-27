import type { Metadata } from "next";
import { ArrowRight, Check, ClipboardList, MapPin } from "lucide-react";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";
import { clinicServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinic Services in Bhaktapur",
  description: "Explore general consultation, routine health checks, basic diagnostics and vaccination support at our clinic in Katunje, Bhaktapur.",
  alternates: { canonical: "/clinic-services" },
};

export default function ClinicServicesPage() {
  return (
    <>
      <PageSchema title="Clinic Services in Bhaktapur" description="General consultation, routine health checks, basic diagnostics and vaccination support at our clinic in Katunje, Bhaktapur." path="/clinic-services" label="Clinic Services" />
      <PageHero eyebrow="Clinic services · Katunje" title="Practical healthcare for everyday needs" description="Understand the available clinic services before visiting from Katunje, Srijananagar, Sallaghari or elsewhere in Bhaktapur." />

      <section className="image-feature-section">
        <div className="container image-feature">
          <figure className="image-feature__media"><img src="/images/blood-pressure-care.webp" alt="Representative clinician checking an adult patient’s blood pressure" loading="lazy" decoding="async" width={1536} height={1024} /><figcaption>Representative routine health-check scene</figcaption></figure>
          <div><span className="kicker">A comfortable local setting</span><h2>Clear information makes every visit feel easier</h2><p>Check the service and current schedule before travelling, then bring any reports, prescriptions and medicines relevant to your consultation.</p></div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container service-detail-list">
          {clinicServices.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={18} aria-hidden="true" />
              <div><h2>{title}</h2><p>{text} Contact the clinic before visiting to confirm the current doctor, timing and service availability.</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container content-grid">
          <div><span className="kicker">Before your consultation</span><h2>Bring the information that helps the doctor understand your health</h2></div>
          <ul className="bold-list">
            <li><Check size={18} /> Current medicines and known allergies</li>
            <li><Check size={18} /> Previous reports, prescriptions or test results</li>
            <li><Check size={18} /> A short note about symptoms and when they started</li>
            <li><Check size={18} /> Identification or health documents relevant to your visit</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container info-pair">
          <article><ClipboardList size={18} /><span className="kicker">Clear next steps</span><h2>What happens after the assessment?</h2><p>The clinician may explain self-care, recommend a medicine, request a test or advise referral to another health service. The recommended next step depends on the individual assessment.</p></article>
          <article><MapPin size={18} /><span className="kicker">Local access</span><h2>Clinic near Sallaghari and Srijananagar</h2><p>The Katunje location is intended to make routine healthcare easier to reach for patients across nearby Bhaktapur neighbourhoods.</p><Link className="text-link" href="/contact">View location details <ArrowRight size={16} /></Link></article>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
