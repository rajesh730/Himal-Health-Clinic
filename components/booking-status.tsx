"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { formatAd, formatBs } from "@/lib/booking-format";
import type { ApiError, Booking, BookingResponse } from "@/lib/booking-types";

type Props = { initialCode?: string };

type StatusCopy = {
  title: string;
  text: string;
  tone: "pending" | "confirmed" | "declined" | "expired";
};

const STATUS_COPY: Record<Booking["status"], StatusCopy> = {
  pending: {
    title: "Waiting for clinic confirmation",
    text: "Your request has reached the clinic. It is not a confirmed appointment yet.",
    tone: "pending",
  },
  confirmed: {
    title: "Appointment confirmed",
    text: "The clinic has confirmed this appointment. Please arrive a little before the stated time.",
    tone: "confirmed",
  },
  declined: {
    title: "Request could not be accepted",
    text: "Please call the clinic to discuss another suitable time.",
    tone: "declined",
  },
  expired: {
    title: "Request expired",
    text: "The appointment time passed before the request could be confirmed. Please make a new request or call the clinic.",
    tone: "expired",
  },
};

function validCode(value: string) {
  return /^[A-Z0-9]{4,16}$/.test(value);
}

async function getStatus(code: string): Promise<BookingResponse | ApiError> {
  try {
    const response = await fetch(
      `/api/booking/status/${encodeURIComponent(code)}`,
      { cache: "no-store" },
    );
    return (await response.json()) as BookingResponse | ApiError;
  } catch {
    return {
      ok: false,
      code: "unreachable",
      message: "We couldn’t reach the clinic. Please try again or phone the clinic.",
    };
  }
}

export function BookingStatus({ initialCode = "" }: Props) {
  const [code, setCode] = useState(initialCode.trim().toUpperCase());
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const didLookUpInitial = useRef(false);

  const lookup = useCallback(async (candidate: string) => {
    const normalized = candidate.trim().toUpperCase();
    if (!validCode(normalized)) {
      setBooking(null);
      setError("Enter the letters and numbers in your booking code.");
      return;
    }

    setCode(normalized);
    setBooking(null);
    setError("");
    setBusy(true);
    const data = await getStatus(normalized);
    setBusy(false);

    if (data.ok) {
      setBooking(data.booking);
    } else {
      setError(data.message);
    }
  }, []);

  useEffect(() => {
    if (!initialCode || didLookUpInitial.current) return;
    didLookUpInitial.current = true;
    void lookup(initialCode);
  }, [initialCode, lookup]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!busy) void lookup(code);
  }

  const status = booking ? STATUS_COPY[booking.status] : null;

  return (
    <div className="booking-status">
      <form className="booking-card booking-status__lookup" onSubmit={submit} noValidate>
        <label htmlFor="booking-code">Booking code</label>
        <div className="booking-status__input-row">
          <input
            id="booking-code"
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            placeholder="e.g. W7K3Q9DX"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={16}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "booking-code-error" : undefined}
          />
          <button className="button" type="submit" disabled={busy} aria-busy={busy}>
            {busy ? "Checking…" : "Check status"} <Search size={16} />
          </button>
        </div>
        {error ? (
          <p className="booking-submit__error" id="booking-code-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" /> {error}
          </p>
        ) : (
          <p className="booking-field__hint">
            You received this code after sending your request.
          </p>
        )}
      </form>

      {booking && status ? (
        <section className="booking-card booking-status__result" aria-live="polite">
          <div className={`booking-status__badge booking-status__badge--${status.tone}`}>
            {booking.status === "confirmed" ? (
              <CheckCircle2 size={18} aria-hidden="true" />
            ) : (
              <Clock3 size={18} aria-hidden="true" />
            )}
            {status.title}
          </div>
          <h2>{booking.doctor.name}</h2>
          <dl className="booking-summary">
            <div>
              <dt>Date</dt>
              <dd>
                {formatAd(booking.date)}
                {booking.dateBs ? <small>{formatBs(booking.dateBs)} BS</small> : null}
              </dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd className="time">{booking.timeLabel}</dd>
            </div>
            <div>
              <dt>Booking code</dt>
              <dd className="time">{booking.ref}</dd>
            </div>
          </dl>
          {booking.timeChanged ? (
            <p className="booking-status__changed">
              The clinic has updated the requested time. The date and time above are the current appointment details.
            </p>
          ) : null}
          <p>{status.text}</p>
          <Link className="text-link" href="/book">
            Make another request <ArrowRight size={16} />
          </Link>
        </section>
      ) : null}
    </div>
  );
}
