import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/news", label: "AI News" },
  { to: "/compare", label: "AI Models" },
  { to: "/tools", label: "Tools" },
  { to: "/categories", label: "Categories" },
  { to: "/finder", label: "AI Finder" },
  { to: "/learn", label: "Learn" },
  { to: "/about", label: "About" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="bazaarai.si home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute text-[8px] font-bold -mt-1">AI</span>
      </span>
      <span className="leading-none">
        <span className="font-display text-xl font-extrabold">bazaar<span className="text-primary">ai</span>.si</span>
        <span className="block text-[10px] opacity-70">AI का पूरा बाजार</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-night-border bg-night/90 text-night-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} activeOptions={{ exact: true }}
              className="rounded-md px-2.5 py-2 text-sm whitespace-nowrap text-night-muted transition-colors hover:text-night-foreground"
              activeProps={{ className: "text-primary-soft font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/finder" aria-label="Search" className="rounded-md p-2 text-night-muted hover:text-night-foreground"><Search className="h-5 w-5" /></Link>
          <button className="hidden rounded-lg border border-night-border px-4 py-2 text-sm sm:block">Login</button>
          <button className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow sm:block">Sign Up</button>
          <button className="rounded-md p-2 xl:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu className="h-6 w-6" /></button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-night p-5 xl:hidden">
          <div className="flex items-center justify-between"><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-6 w-6" /></button></div>
          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg hover:bg-night-2">{n.label}</Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <button className="rounded-lg border border-night-border py-3">Login</button>
            <button className="rounded-lg bg-primary py-3 font-semibold text-primary-foreground">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
}
