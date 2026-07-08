import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { clearStrapiMemoryCache } from '@vns-core/core/cache/index';
import { purgeCloudflareCache } from '@vns-core/core/cloudflare';

// Wipe Next's on-disk optimized-image cache. Only call when a media asset actually
// changed (Strapi media.* event) — it drops EVERY optimized image site-wide, so the
// next visitor re-optimizes all of them. Best-effort: never throws.
async function clearNextImageCache(): Promise<void> {
  try {
    await rm(path.join(process.cwd(), '.next', 'cache', 'images'), { recursive: true, force: true });
  } catch {
    /* best-effort */
  }
}

// Called by the Strapi publish webhook. Busts every cache layer a restart won't clear:
//   1. clearStrapiMemoryCache() — drops CacheManager's in-memory Strapi copies
//   2. revalidatePath('/', 'layout') — invalidates Full Route + fetch Data Cache
//   3. purgeCloudflareCache() — drops Cloudflare's edge cache
//   4. clearNextImageCache() — ONLY on a real media change
async function revalidateEverything(clearImages: boolean) {
  clearStrapiMemoryCache();
  revalidatePath('/', 'layout');
  if (clearImages) await clearNextImageCache();
  return purgeCloudflareCache();
}

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Revalidation not configured' }, { status: 500 });
  }

  const token = req.nextUrl.searchParams.get('secret') ?? req.headers.get('x-revalidate-secret');
  if (token !== secret) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Only nuke the image cache when Strapi reports a media change.
  let clearImages = false;
  try {
    const body = (await req.json()) as { event?: unknown };
    clearImages = typeof body.event === 'string' && body.event.startsWith('media');
  } catch {
    /* no/invalid body → content revalidate only */
  }

  const cloudflare = await revalidateEverything(clearImages);
  return NextResponse.json({ revalidated: true, clearImages, cloudflare, at: new Date().toISOString() });
}

// GET for manual testing: only wipe images with explicit ?images=1
export async function GET(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Revalidation not configured' }, { status: 500 });
  }

  const token = req.nextUrl.searchParams.get('secret');
  if (token !== secret) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const clearImages = req.nextUrl.searchParams.get('images') === '1';
  const cloudflare = await revalidateEverything(clearImages);
  return NextResponse.json({ revalidated: true, clearImages, cloudflare, at: new Date().toISOString() });
}
