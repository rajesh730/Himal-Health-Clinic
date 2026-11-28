import { clinicnp, invalid, relay } from "@/lib/clinicnp";

export const dynamic = "force-dynamic";

const ID = /^[A-Za-z0-9_-]{1,64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/booking/slots?doctorId=...&date=2026-11-28
export async function GET(req: Request) {
  const url = new URL(req.url);
  const doctorId = url.searchParams.get("doctorId") ?? "";
  const date = url.searchParams.get("date") ?? "";

  if (!ID.test(doctorId)) return invalid("Please choose a doctor.", "doctorId");
  if (!DATE.test(date)) return invalid("Please choose a date.", "date");

  return relay(
    await clinicnp(
      `/doctors/${encodeURIComponent(doctorId)}/slots?date=${encodeURIComponent(date)}`,
    ),
  );
}
