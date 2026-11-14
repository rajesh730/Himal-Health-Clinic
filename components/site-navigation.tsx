import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { nav } from "@/lib/site";

export function DesktopNavigation() {
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {nav.map((item) => (
        <Link key={item.href} href={item.href}>{item.label}</Link>
      ))}
    </nav>
  );
}

export function MobileNavigation() {
  return (
    <nav aria-label="Mobile navigation">
      {nav.map((item) => (
        <Link key={item.href} href={item.href}>{item.label}<ArrowUpRight size={16} /></Link>
      ))}
    </nav>
  );
}
