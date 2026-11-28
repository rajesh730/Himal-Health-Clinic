import "server-only"; // keeps this file (and the API key) out of browser bundles

import type { ApiError } from "@/lib/booking-types";

/**
 * Server-side client for the ClinicNP public booking API.
 *
 * The key lives only in the server environment (`CLINICNP_API_KEY`, never
 * `NEXT_PUBLIC_`). The browser talks to our own `/api/booking/*` routes, which
 * call ClinicNP through this helper.
 */

const BASE = process.env.CLINICNP_API_URL?.replace(/\/$/, "");
const KEY = process.env.CLINICNP_API_KEY;

/** Shown to visitors whenever the problem is on our side, not theirs. */
const PHONE_FALLBACK =
  "Online booking is unavailable just now. Please phone the clinic to book.";

function failure(code: string, message: string): ApiError {
  return { ok: false, code, message };
}

/** Calls ClinicNP from the server. Returns ClinicNP's status and JSON. */
export async function clinicnp<T = unknown>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown; visitorIp?: string } = {},
): Promise<{ status: number; data: T | ApiError; headers?: Headers }> {
  if (!BASE || !KEY) {
    console.error("[clinicnp] CLINICNP_API_URL or CLINICNP_API_KEY is not set");
    return { status: 503, data: failure("not_configured", PHONE_FALLBACK) };
  }

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: init.method ?? "GET",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init.visitorIp ? { "X-Visitor-IP": init.visitorIp } : {}),
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: "no-store", // free times change by the minute — never cache
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    console.error(`[clinicnp] ${init.method ?? "GET"} ${path} failed`, error);
    return {
      status: 502,
      data: failure(
        "unreachable",
        "The clinic could not be reached. Please try again or phone the clinic.",
      ),
    };
  }

  const data = (await res.json().catch(() => null)) as T | ApiError | null;

  // A wrong or revoked key is a setup error: log it, and never show the
  // technical detail to visitors.
  if (res.status === 401) {
    console.error("[clinicnp] 401 unauthorized — check CLINICNP_API_KEY");
    return { status: 503, data: failure("unavailable", PHONE_FALLBACK) };
  }

  if (data === null) {
    console.error(`[clinicnp] ${path} returned non-JSON (HTTP ${res.status})`);
    return {
      status: 502,
      data: failure(
        "unreachable",
        "The clinic could not be reached. Please try again or phone the clinic.",
      ),
    };
  }

  return { status: res.status, data, headers: res.headers };
}

/** The visitor's IP, for ClinicNP's per-visitor limits. */
export function visitorIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    ""
  );
}

/** JSON response that also passes through `Retry-After` on rate limits. */
export function relay(result: {
  status: number;
  data: unknown;
  headers?: Headers;
}): Response {
  const headers = new Headers({ "Cache-Control": "no-store" });
  const retryAfter = result.headers?.get("retry-after");
  if (retryAfter) headers.set("Retry-After", retryAfter);
  return Response.json(result.data, { status: result.status, headers });
}

/** A 400 in the same shape ClinicNP uses, for requests we reject ourselves. */
export function invalid(message: string, field?: string): Response {
  return Response.json(
    { ok: false, code: "invalid", message, ...(field ? { field } : {}) },
    { status: 400, headers: { "Cache-Control": "no-store" } },
  );
}
