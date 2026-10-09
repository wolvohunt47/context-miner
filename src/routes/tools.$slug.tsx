import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { useState } from "react";
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
          <a href={tool.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-glow">Visit Official Site <ExternalLink className="h-4 w-4" /></a>
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
      <h2 className="mt-12 text-xl font-bold">Alternatives</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">{alts.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
    </div>
  );
}
