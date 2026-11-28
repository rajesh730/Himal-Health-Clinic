import type { Metadata } from "next";
import { BookingStatus } from "@/components/booking-status";
import { PageHero } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Check Appointment Request",
  description: "Check the status of a Himal Health Clinic appointment request.",
  alternates: { canonical: "/book/status" },
  robots: { index: false, follow: false },
};

type BookingStatusPageProps = {
  searchParams: Promise<{ code?: string | string[] }>;
};

export default async function BookingStatusPage({
  searchParams,
}: BookingStatusPageProps) {
  const params = await searchParams;
  const initialCode = typeof params.code === "string" ? params.code : "";

  return (
    <>
      <PageHero
        eyebrow="Appointment request"
        title="Check your booking status"
        description="Enter the booking code from your request. This page never displays patient contact details."
      />
      <section className="section booking-status-section">
        <div className="container booking-status-wrap">
          <BookingStatus initialCode={initialCode} />
        </div>
      </section>
    </>
  );
}
