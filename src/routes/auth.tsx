import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { next?: string | undefined } => ({
    next: typeof s["next"] === "string" ? (s["next"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in or create an account | BazaarAI.si" },
      { name: "description", content: "Sign in to BazaarAI.si to save tools, write reviews and build your AI stack." },
      { property: "og:title", content: "Sign in | BazaarAI.si" },
      { property: "og:description", content: "Sign in to save tools and write reviews." },
    ],
  }),
  component: AuthPage,
});

function safeNext(next: string | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  const go = () => navigate({ to: safeNext(next) });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name }, emailRedirectTo: window.location.origin + safeNext(next) },
        });
        if (error) throw error;
        setMessage({ kind: "info", text: "Check your email to confirm your account, then sign in." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        go();
      }
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setBusy(false);
    }
  }

  async function signInWithGoogle() {
    setBusy(true);
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setMessage({ kind: "error", text: result.error.message ?? "Google sign-in failed" });
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    go();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <p className="mt-2 text-muted-foreground">Save tools, write reviews and build your AI stack.</p>

      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={busy}
        className="mt-8 flex items-center justify-center gap-2 rounded-xl border bg-card px-4 py-3 font-semibold shadow-card transition hover:border-primary/40 disabled:opacity-60"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.2-2 3.7-5 3.7-8.6z" />
          <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-6-2.2-7-5.1l-3.9 3C3 20.5 7.2 24 12 24z" />
          <path fill="#FBBC05" d="M5 14.3c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3l-3.9-3C.4 8.3 0 10.1 0 12s.4 3.7 1.1 5.3l3.9-3z" />
          <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.2 0 3 3.5 1.1 6.7l3.9 3c1-2.9 3.8-5 7-5z" />
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />or with email<span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode === "signup" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border bg-card px-4 py-3 outline-none focus:border-primary"
          />
        )}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-xl border bg-card px-4 py-3 outline-none focus:border-primary"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
          className="w-full rounded-xl border bg-card px-4 py-3 outline-none focus:border-primary"
        />
        {message && (
          <p className={`rounded-lg px-3 py-2 text-sm ${message.kind === "error" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(null); }}
        className="mt-6 text-sm text-accent-foreground underline-offset-4 hover:underline"
      >
        {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
