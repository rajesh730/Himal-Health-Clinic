"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

/** Marks the link for the current section, including nested blog articles. */
function useCurrent() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNavigation() {
  const isCurrent = useCurrent();
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isCurrent(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNavigation() {
  const isCurrent = useCurrent();
  return (
    <nav aria-label="Mobile navigation">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isCurrent(item.href) ? "page" : undefined}
          // The header persists across client navigations, so close the
          // menu explicitly once a destination is chosen.
          onClick={(event) =>
            event.currentTarget.closest("details")?.removeAttribute("open")
          }
        >
          {item.label}
          <ArrowUpRight size={16} />
        </Link>
      ))}
    </nav>
  );
}
