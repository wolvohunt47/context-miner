import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck, ExternalLink, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTool, tools } from "@/lib/data";
import { ToolAvatar, ToolCard } from "@/components/tool-card";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.tool;
    const title = t ? `${t.name} by ${t.org} — Review, uses & alternatives | BazaarAI.si` : "Tool | BazaarAI.si";
    const desc = t ? `${t.name}: ${t.description}` : "AI tool details";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  component: ToolPage,
});

const tabs = ["Overview", "Features", "Pricing", "Use Cases", "Integrations", "Alternatives"];

function SaveButton({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => (await supabase.auth.getUser()).data.user,
  });
  const { data: saved } = useQuery({
    queryKey: ["saved-tools", slug],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("saved_tools").select("id").eq("tool_slug", slug).maybeSingle();
      return !!data;
    },
  });
  const toggle = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("not-signed-in");
      if (saved) {
        await supabase.from("saved_tools").delete().eq("tool_slug", slug).eq("user_id", user.id);
      } else {
        await supabase.from("saved_tools").insert({ tool_slug: slug, user_id: user.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-tools"] });
    },
  });

  if (!user) {
    return (
      <Link to="/auth" search={{ next: `/tools/${slug}` }} className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5 font-semibold">
        <Bookmark className="h-4 w-4" /> Sign in to save
      </Link>
    );
  }
  return (
    <button
      onClick={() => toggle.mutate()}
      disabled={toggle.isPending}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold disabled:opacity-60 ${saved ? "bg-primary text-primary-foreground shadow-glow" : "border bg-card"}`}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {saved ? "Saved" : "Save tool"}
    </button>
  );
}

function Reviews({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => (await supabase.auth.getUser()).data.user,
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("id, rating, comment, created_at, user_id").eq("tool_slug", slug).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const addReview = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("not-signed-in");
      const { error } = await supabase.from("reviews").insert({ tool_slug: slug, user_id: user.id, rating, comment: comment || null });
      if (error) throw error;
    },
    onSuccess: () => {
      setComment("");
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["reviews", slug] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Could not post review"),
  });

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        Community Reviews
        {avg && <span className="flex items-center gap-1 rounded-md bg-primary-soft px-2 py-0.5 text-sm text-accent-foreground"><Star className="h-4 w-4 fill-current" />{avg} · {reviews.length}</span>}
      </h2>
      {user ? (
        <form
          onSubmit={(e) => { e.preventDefault(); addReview.mutate(); }}
          className="mt-4 space-y-3 rounded-xl border bg-card p-5 shadow-card"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                <Star className={`h-6 w-6 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)"
            rows={3}
            className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
          />
          {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <button disabled={addReview.isPending} className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground disabled:opacity-60">
            {addReview.isPending ? "Posting…" : "Post review"}
          </button>
        </form>
      ) : (
        <p className="mt-4 rounded-xl border bg-card p-5 text-sm text-muted-foreground shadow-card">
          <Link to="/auth" search={{ next: `/tools/${slug}` }} className="font-semibold text-accent-foreground underline">Sign in</Link> to write a review.
        </p>
      )}
      <ul className="mt-6 space-y-3">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-xl border bg-card p-4 shadow-card">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
            </div>
            {r.comment && <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>}
          </li>
        ))}
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet — be the first.</p>}
      </ul>
    </section>
  );
}

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const [tab, setTab] = useState("Overview");
  const alts = tools.filter((t) => t.slug !== tool.slug).slice(0, 3);
  const facts = [["Best for", tool.bestFor], ["Not ideal for", tool.notIdealFor], ["Models used", tool.models], ["Integrations", tool.integrations]];
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-muted-foreground"><Link to="/">Home</Link> / Tools / <span className="text-foreground">{tool.name}</span></nav>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <ToolAvatar tool={tool} size="lg" />
          <div>
            <h1 className="text-3xl font-extrabold">{tool.name}</h1>
            <div className="text-muted-foreground">by {tool.org}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">{tool.tags.map((t) => <span key={t} className="rounded-md bg-primary-soft px-2 py-0.5 text-xs text-accent-foreground">{t}</span>)}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <a href={tool.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-glow">Visit Official Site <ExternalLink className="h-4 w-4" /></a>
            <SaveButton slug={tool.slug} />
          </div>
          <div className="text-sm text-muted-foreground">Pricing: <span className="font-medium text-success">{tool.pricing}</span></div>
        </div>
      </div>
      <div className="no-scrollbar mt-8 flex gap-1 overflow-x-auto border-b">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`shrink-0 border-b-2 px-4 py-2 text-sm ${tab === t ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-bold">What is {tool.name}?</h2>
          <p className="text-muted-foreground">{tool.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {facts.map(([k, v]) => <div key={k} className="rounded-xl border bg-card p-4 shadow-card"><div className="text-sm font-semibold">{k}</div><div className="text-sm text-muted-foreground">{v}</div></div>)}
          </div>
        </div>
        <aside className="rounded-xl border bg-card p-5 text-sm shadow-card">
          <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-success" />Trust & sources</div>
          <dl className="mt-3 space-y-2 text-muted-foreground">
            <div>Official URL: <a className="text-accent-foreground underline" href={tool.url} target="_blank" rel="noopener noreferrer">{new URL(tool.url).hostname}</a></div>
            <div>Last verified: {tool.lastVerified}</div>
            <div>Affiliate: none</div>
          </dl>
        </aside>
      </div>
      <Reviews slug={tool.slug} />
      <h2 className="mt-12 text-xl font-bold">Alternatives</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">{alts.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
    </div>
  );
}
