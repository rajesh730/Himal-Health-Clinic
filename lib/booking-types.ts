/**
 * Shapes returned by the ClinicNP public booking API (v1). Shared by the
 * server helper, the API routes and the booking form; contains no secrets.
 */

export type BookingDoctor = {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
};

export type BookingWindow = {
  opensAt: string;
  closesAt: string;
  slotMinutes: number;
  leadHours: number;
  horizonDays: number;
  earliest: { date: string; dateBs: string; time: string };
  lastDate: { date: string; dateBs: string };
  timeZone: string;
};

export type BookingSlot = { time: string; label: string };

export type BookingStatus = "pending" | "confirmed" | "declined" | "expired";

export type Booking = {
  ref: string;
  status: BookingStatus;
  doctor: { id: string; name: string };
  date: string;
  dateBs: string;
  time: string;
  timeLabel: string;
  timeChanged: boolean;
  requestedAt: string;
};

export type ApiError = {
  ok: false;
  code: string;
  message: string;
  field?: string;
};

export type DoctorsResponse =
  | { ok: true; accepting: boolean; window: BookingWindow; doctors: BookingDoctor[] }
  | ApiError;

export type SlotsResponse =
  | {
      ok: true;
      doctorId: string;
      date: string;
      dateBs: string;
      slots: BookingSlot[];
    }
  | ApiError;

export type BookingResponse =
  | { ok: true; existing?: boolean; booking: Booking }
  | ApiError;
