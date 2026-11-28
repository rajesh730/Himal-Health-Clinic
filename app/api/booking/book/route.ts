import { clinicnp, invalid, relay, visitorIp } from "@/lib/clinicnp";

export const dynamic = "force-dynamic";

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/**
 * Forwards a booking request to ClinicNP. Only the fields ClinicNP accepts are
 * passed on, so nothing else a browser sends can reach the clinic's system.
 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return invalid("Something went wrong sending the form. Please try again.");
  }
  if (!raw || typeof raw !== "object") {
    return invalid("Something went wrong sending the form. Please try again.");
  }

  const patient = (raw.patient ?? {}) as Record<string, unknown>;
  const age = patient.age as { value?: unknown; unit?: unknown } | null | undefined;
  const ageValue = Number(age?.value);

  const body = {
    requestId: str(raw.requestId, 100),
    doctorId: str(raw.doctorId, 64),
    date: str(raw.date, 10),
    time: str(raw.time, 5),
    patient: {
      name: str(patient.name, 100),
      phone: str(patient.phone, 20),
      sex: str(patient.sex, 10),
      age:
        age && Number.isFinite(ageValue) && ageValue > 0
          ? {
              value: Math.round(ageValue),
              unit: ["y", "m", "d"].includes(String(age.unit)) ? age.unit : "y",
            }
          : null,
      address: str(patient.address, 200),
    },
    reason: str(raw.reason, 300),
  };

  if (body.requestId.length < 8) {
    return invalid("Please reload the page and try again.");
  }

  return relay(
    await clinicnp("/bookings", {
      method: "POST",
      body,
      visitorIp: visitorIp(req),
    }),
  );
}
