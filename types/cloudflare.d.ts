/**
 * Minimal ambient Cloudflare Workers declarations.
 *
 * The Sites runtime provides these globals, but the project deliberately does
 * not add `@cloudflare/workers-types` — the lockfile is owned by the Sites
 * install step. Only the surface this site actually touches is declared: the
 * `ASSETS` fetcher used by `worker/index.ts`, the optional D1 binding handed to
 * Drizzle, and the `cloudflare:workers` module `db/index.ts` reads env from.
 */

interface Fetcher {
  fetch(input: Request | string, init?: RequestInit): Promise<Response>;
}

interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
  error?: string;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  raw<T = unknown[]>(): Promise<T[]>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = Record<string, unknown>>(
    statements: D1PreparedStatement[],
  ): Promise<D1Result<T>[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
  dump(): Promise<ArrayBuffer>;
}

declare module "cloudflare:workers" {
  export const env: { DB?: D1Database } & Record<string, unknown>;
}
