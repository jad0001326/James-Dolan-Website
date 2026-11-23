"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/lib/site";

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="font-serif text-lg leading-none text-ink no-underline">
          James Dolan
          <span className="mt-1 block font-mono text-[0.68rem] font-medium tracking-[0.14em] text-brass uppercase">
            SOAR engineer
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold no-underline ${
                        current ? "bg-bg-elev text-ink" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/cv" className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-muted no-underline">
                  CV
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm font-semibold text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <nav id={menuId} aria-label="Primary" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
          {nav.map((item, index) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className="inline-flex min-h-11 items-center text-base font-semibold text-ink no-underline"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/cv" className="inline-flex min-h-11 items-center text-base font-semibold text-ink no-underline">
              CV
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
