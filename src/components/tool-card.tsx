import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/data";

export function ToolAvatar({ tool, size = "md" }: { tool: Tool; size?: "md" | "lg" }) {
  const s = size === "lg" ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm";
  return <span className={`grid ${s} shrink-0 place-items-center rounded-xl bg-primary-soft font-display font-bold text-accent-foreground`}>{tool.initials}</span>;
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link to="/tools/$slug" params={{ slug: tool.slug }}
      className="group flex flex-col rounded-2xl border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-center gap-3">
        <ToolAvatar tool={tool} />
        <div><div className="font-semibold">{tool.name}</div><div className="text-xs text-muted-foreground">{tool.org}</div></div>
      </div>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{tool.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.tags.map((t) => <span key={t} className="rounded-md bg-primary-soft px-2 py-0.5 text-xs text-accent-foreground">{t}</span>)}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-success">{tool.pricing}</span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">View <ArrowRight className="h-3 w-3" /></span>
      </div>
    </Link>
  );
}
