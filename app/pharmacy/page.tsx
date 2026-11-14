import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, MessageCircle, PackageCheck, Pill, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ContactBand, PageHero } from "@/components/site-shell";
import { PageSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Pharmacy in Katunje, Bhaktapur",
  description: "Visit our local pharmacy in Katunje, Bhaktapur, near Srijananagar and Sallaghari, for prescription and over-the-counter medicine support.",
  alternates: { canonical: "/pharmacy" },
};

const support = [
  { icon: Pill, title: "Prescription support", text: "Bring a valid prescription where one is required and ask the pharmacy team about current medicine availability." },
  { icon: PackageCheck, title: "Availability checks", text: "Confirm availability before travelling when you need a specific medicine, strength or dosage form." },
  { icon: MessageCircle, title: "Medicine-use guidance", text: "Ask how to take, store and handle medicines, and when to return to a doctor for further advice." },
  { icon: ShieldCheck, title: "Responsible supply", text: "Prescription requirements and professional guidance are part of safe pharmacy practice." },
];

export default function PharmacyPage() {
  return (
    <>
      <PageSchema title="Pharmacy in Katunje, Bhaktapur" description="Local prescription and over-the-counter medicine support near Srijananagar and Sallaghari." path="/pharmacy" label="Pharmacy" />
      <PageHero invert eyebrow="In-house pharmacy · Bhaktapur" title="Local medicine support with clear guidance." description="Pharmacy information for patients in Katunje, Srijananagar, Sallaghari and nearby Bhaktapur areas." />
      <section className="image-feature-section">
        <div className="container image-feature image-feature--reverse">
          <figure className="image-feature__media"><img src="/images/pharmacy.webp" alt="Representative bright and organised neighbourhood pharmacy" loading="lazy" decoding="async" width={1536} height={1024} /><figcaption>Representative pharmacy environment.</figcaption></figure>
          <div><span className="kicker">Organised medicine support</span><h2>A pharmacy experience that feels clear and approachable.</h2><p>Ask about availability, medicine use and storage instructions in a calm setting without unnecessary confusion.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--stacked"><span className="kicker">Pharmacy services</span><h2>What you can ask the pharmacy team about</h2></div>
          <div className="numbered-grid">
            {support.map(({ icon: Icon, title, text }, index) => <article className="numbered-card" key={title}><div className="numbered-card__top"><span>0{index + 1}</span><Icon size={25} /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section pharmacy-guidance">
        <div className="container content-grid">
          <div><span className="kicker">Use medicines safely</span><h2>Ask questions before you leave.</h2><p>Make sure you understand the dose, timing, duration, storage instructions and possible precautions. Tell the pharmacist about allergies and other medicines you already use.</p></div>
          <div className="statement-card"><BadgeCheck size={34} /><strong>Important</strong><p>Do not start, stop or change a prescription medicine without appropriate advice from a qualified health professional.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="container editorial-callout"><span>Katunje · Bhaktapur</span><h2>Check medicine availability before travelling.</h2><Link className="button" href="/contact">Contact the pharmacy <ArrowRight size={18} /></Link></div>
      </section>
      <ContactBand />
    </>
  );
}
