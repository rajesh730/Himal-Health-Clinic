import { ArrowUpRight, MapPin, Menu, Phone, Siren } from "lucide-react";
import Link from "next/link";
import { nav, phonesE164, site } from "@/lib/site";
import {
  DesktopNavigation,
  MobileNavigation,
} from "@/components/site-navigation";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label={`${site.name} home`}>
      {/* The clinic mark is painted from /logo-mark.png as a CSS mask so it
          inherits `currentColor` — white on the header badge, deep teal on the
          reversed footer badge. */}
      <span className="logo-mark" aria-hidden="true" />
      <span>
        {site.shortName}
        <small>Health Clinic · Pharmacy</small>
      </span>
    </Link>
  );
}

function EmergencyPulse() {
  return <span className="emergency-pulse" aria-hidden="true" />;
}

export function EmergencyCallout() {
  return (
    <section className="emergency-callout" aria-labelledby="emergency-title">
      <div className="container">
        <div className="emergency-card">
          <div className="emergency-card__intro">
            <span className="emergency-card__icon" aria-hidden="true">
              <Siren size={26} />
            </span>
            <div>
              <span className="kicker kicker--light emergency-card__kicker">
                <EmergencyPulse /> Emergency services
              </span>
              <h2 id="emergency-title">Urgent care when it matters most.</h2>
              <p>
                Himal Health Clinic provides emergency services. Call ahead so
                our team can prepare for your arrival.
              </p>
            </div>
          </div>
          <div className="emergency-card__phones">
            {site.phones.map((phone, index) => (
              <a href={`tel:${phonesE164[index]}`} key={phone}>
                <span className="emergency-card__phone-icon" aria-hidden="true">
                  <Phone size={19} />
                </span>
                <span className="emergency-card__phone-text">
                  <small>Emergency line {index + 1}</small>
                  {phone}
                </span>
                <ArrowUpRight
                  className="emergency-card__arrow"
                  size={18}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteHeader() {
  return (
    <>
      <div className="location-bar">
        <div className="container location-bar__inner">
          <div className="location-bar__emergency">
            <span className="location-bar__emergency-label">
              <EmergencyPulse /> Emergency
            </span>
            <span className="location-bar__phones">
              {site.phones.map((phone, index) => (
                <a href={`tel:${phonesE164[index]}`} key={phone}>
                  {phone}
                </a>
              ))}
            </span>
          </div>
          <a
            className="location-bar__place"
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={15} aria-hidden="true" />
            <span>
              {site.location}
              <span className="location-bar__nearby">
                {" "}
                · {site.nearby}
              </span>
            </span>
            <ArrowUpRight
              className="location-bar__arrow"
              size={14}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-shell">
          <Logo />
          <DesktopNavigation />
          <a className="button button--compact" href={`tel:${phonesE164[0]}`}>
            <Phone size={17} /> Call clinic
          </a>
          <details className="mobile-menu">
            <summary>
              <Menu size={22} />
              <span>Menu</span>
            </summary>
            <MobileNavigation />
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Himal Health Clinic and pharmacy support for Katunje, Suryabinayak,
            Sallaghari and nearby Bhaktapur communities.
          </p>
        </div>
        <div>
          <strong>Explore</strong>
          {nav.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <strong>Visit</strong>
          <p>{site.address}</p>
          <a
            className="footer-map"
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open area map <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {site.name}</span>
        <span>Emergency services available · {site.phones.join(" / ")}</span>
        <a
          className="developer-credit"
          href="https://www.infobytesnepal.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed &amp; developed by Infobytes Nepal <ArrowUpRight size={13} />
        </a>
      </div>
      <a className="mobile-cta" href={`tel:${phonesE164[0]}`}>
        <EmergencyPulse /> Emergency · Call {site.phones[0]}
      </a>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  invert?: boolean;
}) {
  return (
    <section className={`page-hero${invert ? " page-hero--dark" : ""}`}>
      <div className="container page-hero__grid">
        <span className="kicker">{eyebrow}</span>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container contact-band__grid">
        <div>
          <span className="kicker kicker--light">Local care in Bhaktapur</span>
          <h2>Need to confirm a service or doctor schedule?</h2>
        </div>
        <div>
          <p>
            Check availability before travelling, especially for visiting
            specialists, tests and vaccinations.
          </p>
          <Link className="button button--light" href="/contact">
            View contact details <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
