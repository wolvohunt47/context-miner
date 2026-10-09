import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Search, Boxes, Bot, Users, Newspaper } from "lucide-react";
import hero from "@/assets/hero-android.jpg";
import { categories, tools } from "@/lib/data";
import { ToolCard } from "@/components/tool-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BazaarAI.si — Discover, Learn, Build & Earn with AI" },
      { name: "description", content: "Find the right AI for what you want to accomplish: tools, models, news, comparisons and AI stacks." },
      { property: "og:title", content: "BazaarAI.si — All Things AI in One Place" },
      { property: "og:description", content: "Discover, compare and choose the right AI tools, models and workflows." },
    ],
  }),
  component: Index,
});

const quick = ["Create", "Code", "Research", "Video", "Marketing", "Automate", "Analyze", "Design", "Business"];
const pillars = [
  { icon: Boxes, k: "Discover", v: "Tools & Models" },
  { icon: Bot, k: "Build", v: "Bots & Templates" },
  { icon: Users, k: "Compare", v: "Side by side" },
  { icon: Newspaper, k: "Daily", v: "Fresh AI News" },
];

function Index() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const list = filter === "All" ? tools : tools.filter((t) => t.category === filter);

  return (
    <>
      <section className="relative overflow-hidden bg-hero text-night-foreground">
        <img src={hero} alt="" width={1600} height={912} className="absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-70 md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 md:pt-20">
          <span className="inline-flex rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-medium">🚀 The Ultimate AI Marketplace</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Discover. Learn. Build. Earn.<br /><span className="text-gradient-brand">All Things AI</span> in One Place.
          </h1>
          <p className="mt-5 max-w-xl text-night-muted md:text-lg">Tell us what you want to do — we help you find the right AI tools, models and workflows.</p>
          <form className="mt-8 flex max-w-2xl items-center gap-2 rounded-2xl bg-card p-2 shadow-glow"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/finder", search: { q } }); }}>
            <Search className="ml-2 h-5 w-5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="What do you want to accomplish with AI?"
              className="min-w-0 flex-1 bg-transparent py-2 text-foreground outline-none placeholder:text-muted-foreground" />
            <button className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Search</button>
          </form>
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {quick.map((c) => (
              <Link key={c} to="/finder" search={{ q: c }} className="shrink-0 rounded-full border border-night-border bg-night-2/70 px-3 py-1 text-sm hover:border-primary">{c}</Link>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {pillars.map(({ icon: I, k, v }) => (
              <div key={k} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary-soft"><I className="h-5 w-5" /></span>
                <div><div className="font-bold">{k}</div><div className="text-xs text-night-muted">{v}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div><h2 className="text-2xl font-bold md:text-3xl">Trending Now 🔥</h2><p className="text-muted-foreground">Popular AI tools and models this week</p></div>
          <Link to="/compare" className="hidden rounded-lg border px-3 py-1.5 text-sm text-accent-foreground sm:inline-flex">Compare models <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </div>
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
          {["All", "AI Chatbots", "Image Generation", "Code & Dev", "Research"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{f}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {list.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-2xl font-bold md:text-3xl">Explore by Category</h2>
        <p className="text-muted-foreground">Find the right AI for your needs</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[c.icon];
            return (
              <Link key={c.name} to="/finder" search={{ q: c.name }} className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-card hover:border-primary/40">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary"><I className="h-5 w-5" /></span>
                <span className="text-sm font-medium">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
