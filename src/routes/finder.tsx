import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { sampleStack } from "@/lib/data";

export const Route = createFileRoute("/finder")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({
    meta: [
      { title: "AI Finder — Get your recommended AI stack | BazaarAI.si" },
      { name: "description", content: "Describe your goal and get a recommended stack of AI tools and workflow." },
      { property: "og:title", content: "AI Finder | BazaarAI.si" },
      { property: "og:description", content: "Tell us what you want to do and get the right AI stack." },
    ],
  }),
  component: Finder,
});

const why = ["Possible with free tools", "Beginner friendly", "Can be fully automated", "Scalable as you grow"];

function Finder() {
  const { q } = Route.useSearch();
  const [goal, setGoal] = useState(q || "I want to create YouTube videos automatically with zero budget.");
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">AI Finder</h1>
      <p className="mt-2 text-muted-foreground">Tell us what you want to do, and we'll recommend the best AI tools and workflow.</p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input value={goal} onChange={(e) => setGoal(e.target.value)} className="flex-1 rounded-xl border bg-card px-4 py-3 shadow-card outline-none focus:border-primary" />
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Find My AI Stack <ArrowRight className="h-4 w-4" /></button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {["Beginner", "Free or low cost", "Fast results", "Open source preferred"].map((f) => (
          <span key={f} className="rounded-lg border bg-card px-3 py-1.5 text-muted-foreground">{f}</span>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-primary-soft px-3 py-2 text-xs text-accent-foreground"><Sparkles className="mr-1 inline h-3 w-3" />Preview: showing a sample recommendation. Live AI recommendations come next.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold">Recommended AI Stack</h2>
          <ol className="mt-4 space-y-3">
            {sampleStack.map((s, i) => (
              <li key={s.step} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-card">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                <div className="w-36 shrink-0"><div className="font-semibold">{s.step}</div><div className="text-xs text-muted-foreground">{s.tool}</div></div>
                <p className="flex-1 text-sm text-muted-foreground">{s.note}</p>
                <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs text-success">{s.price}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Get Detailed Workflow <ArrowRight className="h-4 w-4" /></button>
            <button className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5"><Bookmark className="h-4 w-4" />Save Stack</button>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <div className="text-sm text-muted-foreground">Estimated cost</div>
            <div className="mt-1 font-display text-3xl font-extrabold text-primary">$0 – $20 / month</div>
            <div className="text-xs text-muted-foreground">Based on free tiers and low-cost plans.</div>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-semibold">Why this stack?</h3>
            <ul className="mt-3 space-y-2 text-sm">{why.map((w) => <li key={w} className="flex gap-2"><Check className="h-4 w-4 text-success" />{w}</li>)}</ul>
          </div>
          <Link to="/compare" className="block rounded-xl border bg-card p-5 text-sm font-medium text-accent-foreground shadow-card">Compare models side by side →</Link>
        </aside>
      </div>
    </div>
  );
}
