import { Link, useNavigate } from "@tanstack/react-router";
import { Bookmark, LogOut, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

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

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);
  return user;
}

function AuthButtons({ mobile }: { mobile?: boolean }) {
  const user = useUser();
  const navigate = useNavigate();
  const base = mobile ? "w-full rounded-lg py-3" : "rounded-lg px-4 py-2 text-sm";

  if (user) {
    return (
      <>
        <Link to="/saved" className={`${base} flex items-center justify-center gap-2 border border-night-border`}>
          <Bookmark className="h-4 w-4" /> Saved
        </Link>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
          className={`${base} flex items-center justify-center gap-2 bg-primary font-semibold text-primary-foreground shadow-glow`}
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </>
    );
  }
  return (
    <>
      <Link to="/auth" className={`${base} border border-night-border text-center`}>Login</Link>
      <Link to="/auth" className={`${base} bg-primary text-center font-semibold text-primary-foreground shadow-glow`}>Sign Up</Link>
    </>
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
          <div className="hidden items-center gap-2 sm:flex"><AuthButtons /></div>
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
          <div className="mt-8 grid gap-3" onClick={() => setOpen(false)}>
            <AuthButtons mobile />
          </div>
        </div>
      )}
    </header>
  );
}
