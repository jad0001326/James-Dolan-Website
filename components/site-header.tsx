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
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="font-mono text-sm leading-none text-ink no-underline">
          <span className="text-accent">JD</span>
          <span className="text-muted">://</span>soar
          <span className="mt-1 block text-[0.68rem] tracking-[0.14em] text-muted uppercase">jamesdolan.info</span>
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
                      className={`inline-flex min-h-11 items-center px-2.5 font-mono text-xs tracking-wide no-underline ${
                        current ? "text-accent" : "text-muted"
                      }`}
                    >
                      {current ? "./" : ""}
                      {item.label.toLowerCase()}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/cv" className="inline-flex min-h-11 items-center px-2.5 font-mono text-xs tracking-wide text-muted no-underline">
                  cv
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="btn lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>
      <nav id={menuId} aria-label="Primary" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 font-mono sm:px-8">
          {nav.map((item, index) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center text-sm no-underline ${current ? "text-accent" : "text-ink"}`}
                >
                  {current ? ">" : " "} {item.label.toLowerCase()}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/cv" className="inline-flex min-h-11 items-center text-sm text-ink no-underline">
              {"  "}cv
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
