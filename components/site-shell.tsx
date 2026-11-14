import { ArrowUpRight, MapPin, Menu, Phone } from "lucide-react";
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

export function SiteHeader() {
  return (
    <>
      <div className="location-bar">
        <div className="container location-bar__inner">
          <span>
            <MapPin size={14} /> {site.location}
          </span>
          <span>{site.nearby}</span>
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
        <span>Health information only · Not an emergency service</span>
        <a
          className="developer-credit"
          href="https://www.infobytesnepal.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Infobytes Nepal <ArrowUpRight size={13} />
        </a>
      </div>
      <a className="mobile-cta" href={`tel:${phonesE164[0]}`}>
        <Phone size={18} /> Call {site.phones[0]}
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
