"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blocks that fade and rise into place as they scroll into view. */
const TARGETS = [
  ".section-heading",
  ".intro-step",
  ".feature",
  ".trust-item",
  ".blog-card",
  ".faq-list details",
  ".doctor-roster",
  ".split-feature > *",
  ".image-feature > *",
  ".local-grid > *",
  ".faq-grid > div:first-child",
  ".contact-band__grid",
  ".service-area__intro",
  ".service-area__list li",
  ".service-detail-list article",
  ".info-pair article",
  ".contact-stack article",
  ".contact-action-panel",
  ".content-grid > *",
  ".editorial-callout",
  ".about-lead > *",
  ".nearby-areas__grid > *",
  ".bold-list li",
].join(",");

/**
 * Adds a one-time reveal to content below the fold. Content already on screen
 * at load is left alone (no flash), and nothing animates for visitors who
 * prefer reduced motion. Without JavaScript everything simply stays visible.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const fold = window.innerHeight;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(TARGETS),
    ).filter((el) => el.getBoundingClientRect().top > fold);

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          observer.unobserve(el);
          // Once settled, drop the reveal classes so the element's own hover
          // transitions apply without the stagger delay.
          const delay = parseInt(el.style.getPropertyValue("--reveal-delay"));
          timers.push(
            window.setTimeout(() => {
              el.classList.remove("reveal", "is-visible");
              el.style.removeProperty("--reveal-delay");
            }, 700 + (delay || 0)),
          );
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    for (const el of elements) {
      // Stagger siblings in a row (at most five steps of 70ms).
      const index = el.parentElement
        ? Array.prototype.indexOf.call(el.parentElement.children, el)
        : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 70}ms`);
      el.classList.add("reveal");
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      // Leave nothing hidden if the page changes mid-animation.
      for (const el of elements) el.classList.remove("reveal", "is-visible");
    };
  }, [pathname]);

  return null;
}
