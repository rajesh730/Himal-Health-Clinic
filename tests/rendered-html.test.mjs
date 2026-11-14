import assert from "node:assert/strict";
import test from "node:test";

/**
 * Renders the homepage through the built worker and asserts the metadata the
 * clinic actually ships. The starter's `codex-preview` development marker was
 * replaced by these production checks — that meta tag is never emitted by this
 * site and has no place in a live clinic page.
 */
async function renderHome() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return { response, html: await response.text() };
}

test("serves the homepage as HTML", async () => {
  const { response, html } = await renderHome();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<html lang="en-NP">/);
  assert.match(html, /Clinic and pharmacy care in Katunje, Bhaktapur\./);
});

test("renders the discovery metadata search engines rely on", async () => {
  const { html } = await renderHome();

  assert.match(html, /<title>[^<]*Katunje, Bhaktapur[^<]*<\/title>/i);
  assert.match(
    html,
    /<meta(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=)[^>]*>/i,
  );
  assert.match(html, /rel="canonical"[^>]*href="[^"]*\/"/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /content="summary_large_image"/i);
  assert.match(html, /name="theme-color"/i);
  assert.match(html, /rel="apple-touch-icon"/i);
});

test("publishes a resolvable clinic entity as JSON-LD", async () => {
  const { html } = await renderHome();

  const blocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map(([, body]) => JSON.parse(body.replace(/\\u003c/gi, "<")));

  assert.ok(blocks.length > 0, "expected at least one JSON-LD block");

  const nodes = blocks.flatMap((block) => block["@graph"] ?? [block]);
  const clinic = nodes.find((node) => node["@type"] === "MedicalClinic");

  assert.ok(clinic, "expected a MedicalClinic node");
  assert.ok(clinic.telephone?.length, "clinic must publish a phone number");
  assert.ok(clinic.address?.addressLocality, "clinic must publish an address");
  assert.ok(
    clinic.openingHoursSpecification?.length,
    "clinic must publish opening hours",
  );
  assert.ok(
    nodes.some((node) => node["@type"] === "Pharmacy"),
    "expected the in-house pharmacy to be described",
  );
  assert.ok(
    nodes.some((node) => node["@type"] === "FAQPage"),
    "expected the homepage FAQ to be described",
  );
});
