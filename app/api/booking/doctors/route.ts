import { clinicnp, relay } from "@/lib/clinicnp";

export const dynamic = "force-dynamic";

/** Doctors taking online bookings, plus the bookable date window. */
export async function GET() {
  return relay(await clinicnp("/doctors"));
}
