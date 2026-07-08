"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Drives the whole page with Lenis for buttery inertial scrolling and syncs it to
 * GSAP's ScrollTrigger so every scroll-driven animation reads the same position.
 * Lenis runs on GSAP's ticker (single RAF loop) to avoid jank — same config as the
 * portfolio project. Mounted once in the root layout, so it never remounts on route
 * change (fixed navbar + framer-motion whileInView keep working).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // On every route change, jump straight to the top — Lenis lives in the layout and
  // never remounts, so without this it would keep the previous page's scroll position.
  // An in-page anchor (#section) is left alone so hash links still work.
  useEffect(() => {
    if (window.location.hash) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis for a smooth glide.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const url = new URL(target.href, window.location.href);
      if (url.pathname !== window.location.pathname) return; // let real navigations happen
      const id = url.hash;
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
