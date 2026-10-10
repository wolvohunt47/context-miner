import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tools, categories } from "@/lib/data";
import { ToolCard } from "@/components/tool-card";
export const Route = createFileRoute("/tools/")({
  head: () => ({ meta: [
    { title: "All AI Tools | BazaarAI.si" }, { name: "description", content: "Browse and filter every AI tool in the bazaar." },
    { property: "og:title", content: "All AI Tools | BazaarAI.si" }, { property: "og:description", content: "Browse and filter every AI tool." },
  ] }),
  component: ToolsPage,
});
function ToolsPage() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const list = tools.filter((t) => (cat === "All" || t.category === cat) && (t.name + t.tagline).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">AI Tools</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools…" className="mt-6 w-full rounded-xl border bg-card px-4 py-3 outline-none focus:border-primary" />
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
        {["All", ...categories.map((c) => c.name)].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      {list.length === 0 && <p className="mt-8 text-muted-foreground">No tools match yet.</p>}
    </div>
  );
}
