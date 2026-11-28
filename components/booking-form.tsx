"use client";

import { AlertCircle, ArrowRight, CalendarDays, Check, Phone, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { formatAd, formatBs } from "@/lib/booking-format";
import type {
  ApiError,
  Booking,
  BookingDoctor,
  BookingResponse,
  BookingSlot,
  BookingWindow,
  DoctorsResponse,
  SlotsResponse,
} from "@/lib/booking-types";

/** Extra details the website keeps about a doctor, keyed by ClinicNP id. */
export type DoctorNote = { schedule: string };

type Props = {
  initial: DoctorsResponse;
  initialDoctorId?: string;
  notes: Record<string, DoctorNote>;
  phone: { display: string; tel: string };
};

type Catalog = { accepting: boolean; window?: BookingWindow; doctors: BookingDoctor[] };

type SlotState = {
  key: string;
  ok: boolean;
  slots: BookingSlot[];
  dateBs?: string;
  message?: string;
};

const EMPTY_FORM = {
  name: "",
  phone: "",
  sex: "",
  age: "",
  ageUnit: "y",
  address: "",
  reason: "",
};

/** Codes that mean "booking can't happen online right now". */
const OFFLINE_CODES = new Set(["not_accepting", "unavailable", "not_configured"]);

async function getJson<T>(url: string, init?: RequestInit): Promise<T | ApiError> {
  try {
    const res = await fetch(url, { cache: "no-store", ...init });
    return (await res.json()) as T | ApiError;
  } catch {
    return {
      ok: false,
      code: "unreachable",
      message: "We couldn’t reach the clinic. Check your connection and try again.",
    };
  }
}

/** One id per submission, reused on retry so a double-click books once. */
function newRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Strips +977, spaces and dashes; Nepali mobiles are 10 digits starting 9. */
function isNepaliMobile(value: string): boolean {
  const digits = value.replace(/[\s-]/g, "").replace(/^\+?977/, "");
  return /^9\d{9}$/.test(digits);
}

function toCatalog(data: DoctorsResponse): Catalog {
  return data.ok
    ? { accepting: data.accepting, window: data.window, doctors: data.doctors }
    : { accepting: false, doctors: [] };
}

/** The element to focus for each field name ClinicNP may report. */
const FIELD_IDS: Record<string, string> = {
  doctorId: "bk-doctor",
  date: "bk-date",
  time: "bk-time",
  "patient.name": "bk-name",
  "patient.phone": "bk-phone",
  "patient.sex": "bk-sex",
  "patient.age": "bk-age",
  "patient.address": "bk-address",
  reason: "bk-reason",
};

function focusField(field: string | undefined) {
  const el = field ? document.getElementById(FIELD_IDS[field] ?? "") : null;
  if (!el) return;
  // Radio groups: focus the chosen option, else the first one.
  const target =
    el.matches("input, select, textarea")
      ? el
      : (el.querySelector<HTMLElement>("input:checked") ??
        el.querySelector<HTMLElement>("input") ??
        el);
  target.focus();
}

const PERIODS = [
  { label: "Morning", test: (h: number) => h < 12 },
  { label: "Afternoon", test: (h: number) => h >= 12 && h < 17 },
  { label: "Evening", test: (h: number) => h >= 17 },
];

export function BookingForm({ initial, initialDoctorId, notes, phone }: Props) {
  const [catalog, setCatalog] = useState<Catalog>(() => toCatalog(initial));
  const [offlineMessage, setOfflineMessage] = useState(
    initial.ok ? "" : initial.message,
  );

  const [doctorId, setDoctorId] = useState(() =>
    initial.ok && initial.doctors.some((d) => d.id === initialDoctorId)
      ? (initialDoctorId as string)
      : "",
  );
  const [date, setDate] = useState(() => (initial.ok ? initial.window.earliest.date : ""));
  const [time, setTime] = useState("");
  const [slotNonce, setSlotNonce] = useState(0);
  const [slotState, setSlotState] = useState<SlotState | null>(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);

  const requestId = useRef<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const slotKey = doctorId && date ? `${doctorId}|${date}|${slotNonce}` : "";

  // Fetch free times whenever the doctor, date or reload counter changes.
  useEffect(() => {
    if (!slotKey) return;
    const [id, day] = slotKey.split("|");
    const controller = new AbortController();
    getJson<SlotsResponse>(
      `/api/booking/slots?doctorId=${encodeURIComponent(id)}&date=${encodeURIComponent(day)}`,
      { signal: controller.signal },
    ).then((data) => {
      if (controller.signal.aborted) return;
      setSlotState(
        data.ok
          ? { key: slotKey, ok: true, slots: data.slots, dateBs: data.dateBs }
          : { key: slotKey, ok: false, slots: [], message: data.message },
      );
    });
    return () => controller.abort();
  }, [slotKey]);

  useEffect(() => {
    if (done) resultRef.current?.focus();
  }, [done]);

  const slotsReady = slotState?.key === slotKey ? slotState : null;
  const slotsLoading = Boolean(slotKey) && !slotsReady;
  const slots = slotsReady?.ok ? slotsReady.slots : [];
  // A chosen time that vanished on reload no longer counts as chosen.
  const chosenTime = slots.some((s) => s.time === time) ? time : "";
  const chosenSlot = slots.find((s) => s.time === chosenTime);
  const doctor = catalog.doctors.find((d) => d.id === doctorId);
  const note = doctor ? notes[doctor.id] : undefined;

  function clearErrors(...keys: string[]) {
    setFieldErrors((current) => {
      if (!keys.some((k) => k in current)) return current;
      const next = { ...current };
      for (const k of keys) delete next[k];
      return next;
    });
  }

  /** Shows errors, then moves focus to the first one once it has rendered. */
  function showErrors(errors: Record<string, string>) {
    flushSync(() => setFieldErrors(errors));
    focusField(Object.keys(FIELD_IDS).find((f) => f in errors));
  }

  function update(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    clearErrors(
      field === "reason" ? "reason" : `patient.${field === "ageUnit" ? "age" : field}`,
    );
  }

  async function reloadDoctors() {
    const data = await getJson<DoctorsResponse>("/api/booking/doctors");
    if (data.ok) {
      setCatalog(toCatalog(data));
    } else if (OFFLINE_CODES.has(data.code)) {
      setOfflineMessage(data.message);
      setCatalog((c) => ({ ...c, accepting: false }));
    }
  }

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!doctorId) errors.doctorId = "Choose a doctor.";
    if (!date) errors.date = "Choose a date.";
    if (!chosenTime) errors.time = "Choose a time.";
    if (!form.name.trim()) errors["patient.name"] = "Enter the patient’s full name.";
    if (!isNepaliMobile(form.phone)) {
      errors["patient.phone"] =
        "Enter a 10-digit Nepali mobile number starting with 9. The confirmation SMS goes here.";
    }
    if (!form.sex) errors["patient.sex"] = "Choose one.";
    if (form.age && !(Number.isInteger(Number(form.age)) && Number(form.age) > 0)) {
      errors["patient.age"] = "Enter the age as a number, or leave it blank.";
    }
    return errors;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setFormError("");

    const errors = validate();
    if (Object.keys(errors).length) {
      showErrors(errors);
      return;
    }
    setFieldErrors({});

    requestId.current ??= newRequestId();
    setBusy(true);
    const data = await getJson<BookingResponse>("/api/booking/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId: requestId.current,
        doctorId,
        date,
        time: chosenTime,
        patient: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          sex: form.sex,
          age: form.age ? { value: Number(form.age), unit: form.ageUnit } : null,
          address: form.address.trim(),
        },
        reason: form.reason.trim(),
      }),
    });
    setBusy(false);

    if (data.ok) {
      setDone(data.booking);
      return;
    }

    // A definite refusal means nothing was created, so the next attempt gets
    // a fresh id. Only a lost connection keeps the id, so a retry of a request
    // that did get through returns that same booking instead of a second one.
    if (data.code !== "unreachable") requestId.current = null;

    switch (data.code) {
      case "slot_taken":
      case "too_soon":
      case "outside_hours":
        setTime("");
        setSlotNonce((n) => n + 1); // someone just took it — show fresh times
        showErrors({ time: data.message });
        return;
      case "too_far":
      case "bad_date":
        showErrors({ date: data.message });
        return;
      case "doctor_not_found":
        setDoctorId("");
        showErrors({ doctorId: data.message });
        reloadDoctors();
        return;
    }
    if (OFFLINE_CODES.has(data.code)) {
      setOfflineMessage(data.message);
      setCatalog((c) => ({ ...c, accepting: false }));
      return;
    }
    if (data.field && FIELD_IDS[data.field]) {
      showErrors({ [data.field]: data.message });
    } else {
      setFormError(data.message);
    }
  }

  function startOver() {
    requestId.current = null;
    setDone(null);
    setForm(EMPTY_FORM);
    setTime("");
    setFieldErrors({});
    setFormError("");
    setSlotNonce((n) => n + 1);
  }

  const err = (field: string) => fieldErrors[field];
  const errProps = (field: string, id: string) =>
    err(field)
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` }
      : {};
  const fieldError = (field: string, id: string) =>
    err(field) ? (
      <p className="booking-field__error" id={`${id}-error`}>
        <AlertCircle size={14} aria-hidden="true" /> {err(field)}
      </p>
    ) : null;

  if (!catalog.accepting || !catalog.window) {
    return (
      <div className="booking-card booking-notice" role="status">
        <CalendarDays size={22} aria-hidden="true" />
        <h2>Online booking is paused just now</h2>
        <p>
          {offlineMessage ||
            "The clinic isn’t taking online requests at the moment."}{" "}
          You can still book by phone.
        </p>
        <a className="button" href={`tel:${phone.tel}`}>
          <Phone size={16} /> Call {phone.display}
        </a>
      </div>
    );
  }

  if (done) {
    return (
      <div
        className="booking-card booking-result"
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <span className="booking-result__icon" aria-hidden="true">
          <Check size={20} />
        </span>
        <span className="kicker">Request received</span>
        <h2>Your booking code is</h2>
        <p className="booking-result__code time">{done.ref}</p>
        <dl className="booking-summary">
          <div>
            <dt>Doctor</dt>
            <dd>{done.doctor.name}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>
              {formatAd(done.date)}
              {done.dateBs ? <small>{formatBs(done.dateBs)} BS</small> : null}
            </dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd className="time">{done.timeLabel}</dd>
          </div>
        </dl>
        <p>
          This is a <strong>request</strong>, not yet a confirmed appointment.
          The clinic’s front desk will confirm it, and you may get an SMS on the
          number you gave. Keep the code to check its status or when you call
          the clinic.
        </p>
        <div className="action-row">
          <a className="button" href={`/book/status?code=${encodeURIComponent(done.ref)}`}>
            Check status <ArrowRight size={16} />
          </a>
          <button className="button button--secondary" type="button" onClick={startOver}>
            <RotateCcw size={16} /> Book another
          </button>
        </div>
      </div>
    );
  }

  const win = catalog.window;

  return (
    <form className="booking-card booking-form" onSubmit={submit} noValidate>
      <fieldset className="booking-step">
        <legend>
          <span className="booking-step__num">1</span> Doctor and time
        </legend>

        <div className="booking-field">
          <label htmlFor="bk-doctor">Doctor</label>
          <select
            id="bk-doctor"
            value={doctorId}
            onChange={(e) => {
              setDoctorId(e.target.value);
              setTime("");
              clearErrors("doctorId", "time");
            }}
            {...errProps("doctorId", "bk-doctor")}
          >
            <option value="">Choose a doctor</option>
            {catalog.doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialty}
              </option>
            ))}
          </select>
          {fieldError("doctorId", "bk-doctor")}
          {doctor ? (
            <p className="booking-field__hint">
              {[doctor.qualification, doctor.specialty].filter(Boolean).join(" · ")}
              {note ? (
                <>
                  <br />
                  Usually consults: <span className="time">{note.schedule}</span>
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="booking-field">
          <label htmlFor="bk-date">Date</label>
          <input
            id="bk-date"
            type="date"
            value={date}
            min={win.earliest.date}
            max={win.lastDate.date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime("");
              clearErrors("date", "time");
            }}
            {...errProps("date", "bk-date")}
          />
          {fieldError("date", "bk-date")}
          <p className="booking-field__hint">
            {date ? (
              <>
                {formatAd(date)}
                {slotsReady?.dateBs ? ` · ${formatBs(slotsReady.dateBs)} BS` : ""}
                <br />
              </>
            ) : null}
            Book from 3 hours ahead up to {win.horizonDays} days ahead.
          </p>
        </div>

        <div
          className="booking-field"
          id="bk-time"
          tabIndex={-1}
          role="group"
          aria-labelledby="bk-time-label"
          {...errProps("time", "bk-time")}
        >
          <span className="booking-field__label" id="bk-time-label">
            Time
          </span>
          {!doctorId ? (
            <p className="booking-slots__empty">Choose a doctor to see free times.</p>
          ) : slotsLoading ? (
            <p className="booking-slots__empty" aria-live="polite">
              Finding free times…
            </p>
          ) : slotsReady && !slotsReady.ok ? (
            <p className="booking-slots__empty">{slotsReady.message}</p>
          ) : slots.length === 0 ? (
            <p className="booking-slots__empty">
              No free times on this day. Please try another date.
            </p>
          ) : (
            <div className="booking-slots">
              {PERIODS.map((period) => {
                const group = slots.filter((s) => period.test(Number(s.time.slice(0, 2))));
                if (!group.length) return null;
                return (
                  <div className="booking-slots__group" key={period.label}>
                    <span className="booking-slots__period">{period.label}</span>
                    <div className="booking-slots__grid">
                      {group.map((slot) => (
                        <label className="booking-slot" key={slot.time}>
                          <input
                            type="radio"
                            name="time"
                            value={slot.time}
                            checked={chosenTime === slot.time}
                            onChange={() => {
                              setTime(slot.time);
                              clearErrors("time");
                            }}
                          />
                          <span className="time">{slot.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {fieldError("time", "bk-time")}
        </div>
      </fieldset>

      <fieldset className="booking-step">
        <legend>
          <span className="booking-step__num">2</span> Patient details
        </legend>

        <div className="booking-field">
          <label htmlFor="bk-name">Full name</label>
          <input
            id="bk-name"
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            {...errProps("patient.name", "bk-name")}
          />
          {fieldError("patient.name", "bk-name")}
        </div>

        <div className="booking-field">
          <label htmlFor="bk-phone">Mobile number</label>
          <input
            id="bk-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98XXXXXXXX"
            maxLength={20}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            {...errProps("patient.phone", "bk-phone")}
          />
          {fieldError("patient.phone", "bk-phone")}
          {!err("patient.phone") ? (
            <p className="booking-field__hint">
              A Nepali mobile, not a landline. The confirmation SMS goes here.
            </p>
          ) : null}
        </div>

        <div className="booking-row">
          <div
            className="booking-field"
            id="bk-sex"
            tabIndex={-1}
            role="radiogroup"
            aria-labelledby="bk-sex-label"
            {...errProps("patient.sex", "bk-sex")}
          >
            <span className="booking-field__label" id="bk-sex-label">
              Sex
            </span>
            <div className="booking-segment">
              {[
                ["female", "Female"],
                ["male", "Male"],
                ["other", "Other"],
              ].map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="sex"
                    value={value}
                    checked={form.sex === value}
                    onChange={() => update("sex", value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {fieldError("patient.sex", "bk-sex")}
          </div>

          <div className="booking-field">
            <label htmlFor="bk-age">
              Age <span className="booking-optional">optional</span>
            </label>
            <div className="booking-age">
              <input
                id="bk-age"
                inputMode="numeric"
                maxLength={3}
                value={form.age}
                onChange={(e) => update("age", e.target.value.replace(/\D/g, ""))}
                {...errProps("patient.age", "bk-age")}
              />
              <select
                aria-label="Age unit"
                value={form.ageUnit}
                onChange={(e) => update("ageUnit", e.target.value)}
              >
                <option value="y">years</option>
                <option value="m">months</option>
                <option value="d">days</option>
              </select>
            </div>
            {fieldError("patient.age", "bk-age")}
          </div>
        </div>

        <div className="booking-field">
          <label htmlFor="bk-address">
            Address <span className="booking-optional">optional</span>
          </label>
          <input
            id="bk-address"
            autoComplete="street-address"
            maxLength={200}
            placeholder="e.g. Katunje, Bhaktapur"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            {...errProps("patient.address", "bk-address")}
          />
          {fieldError("patient.address", "bk-address")}
        </div>

        <div className="booking-field">
          <label htmlFor="bk-reason">
            Reason for visit <span className="booking-optional">optional</span>
          </label>
          <textarea
            id="bk-reason"
            rows={3}
            maxLength={300}
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
            {...errProps("reason", "bk-reason")}
          />
          {fieldError("reason", "bk-reason")}
          <p className="booking-field__hint booking-field__count">
            {form.reason.length}/300
          </p>
        </div>
      </fieldset>

      <div className="booking-submit">
        {doctor && chosenSlot ? (
          <p className="booking-submit__summary">
            {doctor.name} · {formatAd(date)} ·{" "}
            <span className="time">{chosenSlot.label}</span>
          </p>
        ) : null}
        {formError ? (
          <p className="booking-submit__error" role="alert">
            <AlertCircle size={16} aria-hidden="true" /> {formError}
          </p>
        ) : null}
        <button className="button" type="submit" disabled={busy} aria-busy={busy}>
          {busy ? "Sending request…" : "Request appointment"}
          {busy ? null : <ArrowRight size={16} />}
        </button>
        <p className="booking-field__hint">
          The clinic confirms every request. It isn’t booked until they do.
        </p>
      </div>
    </form>
  );
}
