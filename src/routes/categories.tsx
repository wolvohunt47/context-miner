import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { categories, tools } from "@/lib/data";
export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [
    { title: "AI Categories | BazaarAI.si" }, { name: "description", content: "Explore AI tools by category." },
    { property: "og:title", content: "AI Categories | BazaarAI.si" }, { property: "og:description", content: "Explore AI tools by category." },
  ] }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[c.icon] ?? Icons.Sparkles;
          const n = tools.filter((t) => t.category === c.name).length;
          return (
            <Link key={c.name} to="/finder" search={{ q: c.name }} className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-card hover:border-primary/40">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary-soft text-primary"><I className="h-6 w-6" /></span>
              <div><div className="font-semibold">{c.name}</div><div className="text-xs text-muted-foreground">{n} tools</div></div>
            </Link>
          );
        })}
      </div>
    </div>
  ),
});
