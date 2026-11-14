import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";
import { localAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Clinic in Katunje, Bhaktapur",
  description:
    "Contact and find Himal Health Clinic & Pharmacy in Katunje, Bhaktapur. Check services, doctors and visiting hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageSchema
        title="Contact Clinic in Katunje, Bhaktapur"
        description="Find Himal Health Clinic & Pharmacy in Katunje, Bhaktapur."
        path="/contact"
        label="Contact"
      />
      <PageHero
        eyebrow="Contact & location"
        title="Find the clinic in Katunje, Bhaktapur."
        description="Use the location details below and confirm the service, doctor schedule and opening time before travelling."
      />
      <section className="image-feature-section">
        <div className="container image-feature">
          <figure className="image-feature__media">
            <img
              src="/images/clinic-interior.webp"
              alt="Representative calm and welcoming clinic reception"
              loading="lazy"
              decoding="async"
              width={1536}
              height={1024}
            />
            <figcaption>Representative clinic environment.</figcaption>
          </figure>
          <div>
            <span className="kicker">Before you travel</span>
            <h2>Confirm the service and schedule first.</h2>
            <p>
              A short confirmation can prevent an unnecessary trip when doctor
              schedules, test availability or public-holiday hours change.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container contact-layout">
          <div className="contact-stack">
            <article>
              <MapPin size={26} />
              <span>Location</span>
              <h2>{site.location}</h2>
              <p>{site.nearby}, Bhaktapur, Nepal.</p>
              <a
                className="text-link"
                href={site.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open area map <ArrowUpRight size={17} />
              </a>
            </article>
            <article>
              <Clock3 size={26} />
              <span>Opening hours</span>
              <h2>{site.hours}</h2>
              <p>
                Confirm public-holiday hours and specialist schedules before
                visiting.
              </p>
            </article>
          </div>
          <aside className="contact-action-panel">
            <span className="kicker kicker--light">Contact details</span>
            <h2>Phone and WhatsApp</h2>
            <p>
              Call the clinic to confirm a doctor schedule, service availability
              or medicine stock before travelling.
            </p>
            {site.phones.map((phone) => (
              <a className="pending-contact" href={`tel:${phone}`} key={phone}>
                <Phone size={22} />
                <span>
                  <small>Clinic phone</small>
                  {phone}
                </span>
              </a>
            ))}
            <a
              className="pending-contact"
              href={`https://wa.me/977${site.phones[0]}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={22} />
              <span>
                <small>WhatsApp</small>Message the clinic
              </span>
            </a>
          </aside>
        </div>
      </section>
      <section className="section section--dark nearby-areas">
        <div className="container nearby-areas__grid">
          <div>
            <span className="kicker kicker--light">Nearby areas</span>
            <h2>Care within easy reach.</h2>
            <p>
              Conveniently located for patients in Katunje and nearby Bhaktapur
              communities.
            </p>
          </div>
          <div className="nearby-areas__list">
            <span>We welcome patients from</span>
            <div className="area-list area-list--dark">
              {localAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section emergency-note">
        <div className="container">
          <strong>Medical emergency?</strong>
          <p>
            This website does not advertise emergency care. For severe breathing
            difficulty, chest pain, major injury, loss of consciousness or
            another life-threatening concern, go to the nearest emergency
            department immediately.
          </p>
        </div>
      </section>
    </>
  );
}
