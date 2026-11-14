"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

function isCurrentPage(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {nav.map((item) => {
        const active = isCurrentPage(pathname, item.href);
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
      })}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile navigation">
      {nav.map((item) => {
        const active = isCurrentPage(pathname, item.href);
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}<ArrowUpRight size={16} /></Link>;
      })}
    </nav>
  );
}
