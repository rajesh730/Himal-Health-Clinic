"use client";

import type { PointerEvent } from "react";

const moments = [
  {
    image: "/images/illustration-heart-health.webp",
    alt: "Animated illustration representing heart health and preventive care",
    label: "Preventive care",
    quote: "Small, steady choices are the strongest kind of care.",
    note: "Everyday movement, balanced meals and timely health advice can support long-term wellbeing.",
  },
  {
    image: "/images/illustration-consultation.webp",
    alt: "Animated illustration of a clinician listening to a patient",
    label: "Clear consultation",
    quote: "Good care begins when questions are heard clearly.",
    note: "Bring your concerns, medicines and recent reports so the conversation can stay focused and useful.",
  },
  {
    image: "/images/illustration-pharmacy.webp",
    alt: "Animated illustration of responsible pharmacy guidance",
    label: "Medicine guidance",
    quote: "The right medicine matters. The right guidance matters too.",
    note: "Ask how to use, store and handle medicines before leaving the pharmacy.",
  },
];

function handlePointerMove(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  card.style.setProperty("--tilt-x", `${((0.5 - y) * 5).toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${((x - 0.5) * 7).toFixed(2)}deg`);
  card.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
  card.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
}

function resetPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--glow-x", "50%");
  card.style.setProperty("--glow-y", "50%");
}

export function HealthMotion() {
  return (
    <div className="health-motion-grid">
      {moments.map((moment, index) => (
        <article className="health-motion-card" key={moment.label} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
          <div className="health-motion-card__visual" aria-hidden="true">
            <span className="motion-orbit motion-orbit--one" />
            <span className="motion-orbit motion-orbit--two" />
            <img
              src={moment.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={1254}
              height={1254}
            />
          </div>
          <div className="health-motion-card__copy">
            <span>{String(index + 1).padStart(2, "0")} · {moment.label}</span>
            <blockquote>“{moment.quote}”</blockquote>
            <p>{moment.note}</p>
          </div>
          <span className="sr-only">{moment.alt}</span>
        </article>
      ))}
    </div>
  );
}
