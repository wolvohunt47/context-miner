import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { useState } from "react";
import { news, newsTopics } from "@/lib/data";
import hero from "@/assets/hero-android.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Latest AI News — Models, Tools & Research | BazaarAI.si" },
      { name: "description", content: "Stay updated with the most important AI developments, sourced and de-duplicated." },
      { property: "og:title", content: "Latest AI News | BazaarAI.si" },
      { property: "og:description", content: "The most important AI developments, curated." },
    ],
  }),
  component: News,
});

function News() {
  const [topic, setTopic] = useState("All News");
  const items = topic === "All News" ? news : news.filter((n) => n.topic === topic);
  const [lead, ...rest] = items;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">Latest AI News</h1>
      <p className="mt-2 text-muted-foreground">Stay updated with the most important AI developments. (Demo headlines)</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col">
          {newsTopics.map((t) => (
            <button key={t} onClick={() => setTopic(t)} className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${topic === t ? "bg-primary-soft font-semibold text-accent-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{t}</button>
          ))}
        </aside>
        <div className="grid gap-4 md:grid-cols-2">
          {!lead && <p className="text-muted-foreground">No stories in this topic yet.</p>}
          {lead && (
            <article className="overflow-hidden rounded-2xl border bg-card shadow-card md:row-span-2">
              <img src={hero} alt="" loading="lazy" width={1600} height={912} className="aspect-video w-full object-cover" />
              <div className="p-5"><h2 className="text-xl font-bold">{lead.title}</h2><Meta n={lead} /></div>
            </article>
          )}
          {rest.map((n) => (
            <article key={n.title} className="rounded-2xl border bg-card p-5 shadow-card">
              <span className="text-xs font-medium text-primary">{n.topic}</span>
              <h3 className="mt-1 font-semibold">{n.title}</h3><Meta n={n} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Meta({ n }: { n: { time: string; source: string } }) {
  return <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{n.time} · {n.source}</div>;
}
