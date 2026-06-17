import { NextResponse } from 'next/server';

// Always run fresh — this is a diagnostic, never cached.
export const dynamic = 'force-dynamic';

/**
 * Diagnostic endpoint: reports whether the Supabase env vars are visible to
 * the deployed runtime and whether a live read succeeds (status + latency).
 * Safe to expose: returns no secrets, only presence flags + a URL prefix.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const out: Record<string, unknown> = {
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(key),
    urlPreview: url ? `${url.slice(0, 24)}…` : null,
    region: process.env.VERCEL_REGION ?? null,
  };

  if (url && key) {
    const started = Date.now();
    try {
      const res = await fetch(`${url}/rest/v1/members?select=id`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: 'count=exact',
          Range: '0-0',
        },
        cache: 'no-store',
      });
      out.queryStatus = res.status;
      out.contentRange = res.headers.get('content-range');
      out.queryMs = Date.now() - started;
    } catch (e) {
      out.queryError = e instanceof Error ? e.message : String(e);
      out.queryMs = Date.now() - started;
    }
  }

  return NextResponse.json(out);
}
