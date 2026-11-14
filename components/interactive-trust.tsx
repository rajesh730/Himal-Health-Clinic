"use client";

import { useState } from "react";
import { trustPoints } from "@/lib/site";

const visualStates = [
  {
    image: "/images/illustration-consultation.webp",
    label: "Verified profiles",
    statement: "Facts before claims.",
  },
  {
    image: "/images/illustration-heart-health.webp",
    label: "Plain-language care",
    statement: "Clarity helps patients decide.",
  },
  {
    image: "/images/illustration-heart-health.webp",
    label: "Close to home",
    statement: "Local access makes care easier.",
  },
  {
    image: "/images/illustration-pharmacy.webp",
    label: "Connected support",
    statement: "Clinic and pharmacy, one visit.",
  },
];

export function InteractiveTrust() {
  const [active, setActive] = useState(0);
  const visual = visualStates[active];

  return (
    <div className="trust-experience">
      <div className="trust-list trust-list--interactive">
        {trustPoints.map(({ icon: Icon, title, text }, index) => (
          <button
            className={`trust-row${active === index ? " trust-row--active" : ""}`}
            type="button"
            key={title}
            aria-pressed={active === index}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="trust-row__number">0{index + 1}</span>
            <span className="trust-row__icon"><Icon size={24} /></span>
            <span className="trust-row__copy"><strong>{title}</strong><span>{text}</span></span>
            <span className="trust-row__arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <aside className="trust-visual" aria-live="polite">
        <div className="trust-visual__stage" aria-hidden="true">
          <span className="trust-orbit trust-orbit--one" />
          <span className="trust-orbit trust-orbit--two" />
          <img
            key={visual.image + active}
            src={visual.image}
            alt=""
            width={1254}
            height={1254}
          />
        </div>
        <div className="trust-visual__copy"><span>{visual.label}</span><strong>{visual.statement}</strong><p>Move across the trust points to explore each commitment.</p></div>
      </aside>
    </div>
  );
}
