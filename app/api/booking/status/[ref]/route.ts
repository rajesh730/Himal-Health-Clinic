import { clinicnp, invalid, relay } from "@/lib/clinicnp";

export const dynamic = "force-dynamic";

/** Status of a booking request by its code. Never returns patient details. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ref: string }> },
) {
  const { ref } = await params;
  const code = ref.trim().toUpperCase();
  if (!/^[A-Z0-9]{4,16}$/.test(code)) {
    return invalid("Booking codes are letters and numbers, like W7K3Q9DX.", "ref");
  }
  return relay(await clinicnp(`/bookings/${encodeURIComponent(code)}`));
}
