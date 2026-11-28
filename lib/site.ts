import {
  Activity,
  BadgeCheck,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TestTube2,
} from "lucide-react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://himal-health-clinic.vercel.app";

export const site = {
  name: "Himal Health Clinic Pvt. Ltd.",
  shortName: "Himal",
  location: "Ward No. 5, Katunje, Bhaktapur",
  nearby: "Near Suryabinayak and Sallaghari",
  address: "Suryabinayak Municipality Ward No. 5, Katunje, Bhaktapur, Nepal",
  pan: "128929655",
  // Order matters: the first number is the primary line, used for "Call
  // clinic", the emergency button and the main call links.
  phones: ["9814222858", "9761626876"],
  /** The number registered on WhatsApp (the primary line). */
  whatsapp: "9814222858",
  hours: "Open every day · 6:00 AM–10:00 PM",
  url: siteUrl,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Katunje+Srijananagar+Sallaghari+Bhaktapur+Nepal",
  logo: "/logo.png",
  ogImage: "/og-image.png",
  locale: "en_NP",
  language: "en-NP",
};

/** Dial-ready international forms of `site.phones`, for `tel:` and schema. */
export const phonesE164 = site.phones.map((phone) => `+977${phone}`);

/**
 * Machine-readable form of `site.hours`, consumed by the LocalBusiness schema.
 * Keep this in sync with the human string above.
 */
export const openingHours = {
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const,
  opens: "06:00",
  closes: "22:00",
};

/**
 * The postal address, shared by every schema graph so search engines resolve a
 * single business entity across the site.
 *
 * Note for the clinic owner: a `geo` block with verified latitude/longitude
 * further improves local results. It is intentionally omitted rather than
 * approximated, because wrong coordinates would misdirect patients.
 */
export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Katunje, Ward No. 5, near Srijananagar and Sallaghari",
  addressLocality: "Bhaktapur",
  addressRegion: "Bagmati Province",
  addressCountry: "NP",
};

/**
 * The website's doctor profiles. `clinicnpId` links each one to its record in
 * ClinicNP (the clinic's booking system), matched by name from ClinicNP's
 * `GET /doctors`. ClinicNP spells some names differently (Sanjeet Kumar Shah,
 * Ajila Prajapati, Rajendra Silpakar); confirm those with the clinic.
 */
export const doctors = [
  {
    name: "Dr. Sanjit Kumar Sah",
    clinicnpId: "01M2WGQCSAHENMBD5HZV27427C",
    credentials: "MBBS, MD",
    specialty: "Consultant Cardiologist",
    registration: "NMC No. 6584",
    hospital: "CVTS, Shahid Gangalal National Heart Centre",
    schedule: "8:30–9:00 AM and after 6:00 PM",
  },
  {
    name: "Dr. Suresh Kayastha",
    clinicnpId: "01M2WGR60GVJVM2H9V0EXDTRKH",
    credentials: "MBBS, MD",
    specialty: "General Physician",
    registration: "NMC No. 8513",
    hospital: "Army Hospital",
    schedule: "After 6:00 PM",
  },
  {
    name: "Dr. Ajala Prajapati",
    clinicnpId: "01M2WGEQEPPBK8AMXTF902Y4JM",
    credentials: "MBBS, MD",
    specialty: "Consultant Gynecologist",
    registration: "NMC No. 6562",
    hospital: "Kantipur Hospital",
    schedule: "1:00–2:00 PM and on call",
  },
  {
    name: "Dr. Radheshyam Gupta",
    clinicnpId: "01M2WGGK5D8E06HTC4XKHA6PHW",
    credentials: "MBBS, MS, PhD, FCAM, TCOM (TX, USA)",
    specialty: "Urologist, Kidney Transplant and Robotic Oncologic Surgeon",
    registration: "NMC No. 10793",
    hospital: "Om Hospital",
    schedule: "After 7:00 PM",
  },
  {
    name: "Dr. Prashant Paudyal",
    clinicnpId: "01M2WGHCMV2JN9BXFRTY6J7MZH",
    credentials: "MBBS, MS",
    specialty: "ENT Surgeon",
    registration: "NMC No. 14512",
    hospital: "BP Eye & ENT Hospital",
    schedule: "4:15–5:00 PM and on call",
  },
  {
    name: "Dr. Sunil Kumar Yadav",
    clinicnpId: "01M2WGJ9DF1C99KV6Q7RX803B0",
    credentials: "MBBS, MS",
    specialty: "Orthopedic Surgeon",
    registration: "NMC No. 14531",
    hospital: "Korean Hospital",
    schedule: "5:00–6:00 PM and on call",
  },
  {
    name: "Dr. Manoj Lal Chaudhary",
    clinicnpId: "01M24ZS8N43W0Z1C3JX6CED425",
    credentials: "MBBS, MD",
    specialty: "Consultant Dermatologist & Venereologist",
    registration: "NMC No. 14901",
    hospital: "Korean Hospital",
    schedule: "9:00–10:00 AM and on call",
  },
  {
    name: "Dr. Rajendra Silpaker",
    clinicnpId: "01M2WGKNGASD7VRWK2WHYYY9RV",
    credentials: "MBBS, MD",
    specialty: "Consultant Pediatrician",
    registration: "NMC No. 18311",
    hospital: "Civil / Siddhi Memorial Hospital",
    schedule: "8:00–9:00 AM and 4:00–5:00 PM",
  },
  {
    name: "Dr. Ashok Kumar Shah",
    clinicnpId: "01M2WGMKQD8XQKWF24KXDJ9VSW",
    credentials: "MBBS",
    specialty: "General Physician",
    registration: "NMC No. 24741",
    hospital: "Dr. Iwamura Hospital",
    schedule: "9:00–10:00 AM and 5:00–8:00 PM",
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book appointment" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const clinicServices = [
  {
    icon: Stethoscope,
    title: "General consultation",
    text: "Clear assessment and practical next-step guidance for common health concerns and follow-up care.",
  },
  {
    icon: Activity,
    title: "Routine health checks",
    text: "Basic monitoring and preventive health checks for adults, older people and families.",
  },
  {
    icon: TestTube2,
    title: "Basic diagnostics",
    text: "Selected routine tests with straightforward explanations and referral guidance when needed.",
  },
  {
    icon: Syringe,
    title: "Vaccination support",
    text: "Information about routine vaccination availability for children and adults before your visit.",
  },
];

export const trustPoints = [
  {
    icon: BadgeCheck,
    title: "Credentials made visible",
    text: "Doctor, pharmacist and registration information belongs where patients can find it easily.",
  },
  {
    icon: ShieldCheck,
    title: "Clear health information",
    text: "Plain-language service details help patients make informed choices without exaggerated claims.",
  },
  {
    icon: HeartPulse,
    title: "Local and accessible",
    text: "One convenient location serving Katunje, Srijananagar, Sallaghari and nearby Bhaktapur communities.",
  },
  {
    icon: Pill,
    title: "Clinic and pharmacy together",
    text: "Consultation and medicine support are available in one connected local setting.",
  },
];

export const localAreas = [
  "Katunje",
  "Srijananagar",
  "Sallaghari",
  "Suryabinayak",
  "Bhaktapur",
];
