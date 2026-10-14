import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getTool } from "@/lib/data";
import { ToolCard } from "@/components/tool-card";

export const Route = createFileRoute("/_authenticated/saved")({
  head: () => ({
    meta: [
      { title: "Your saved tools | BazaarAI.si" },
      { name: "description", content: "Your bookmarked AI tools, all in one place." },
      { property: "og:title", content: "Saved tools | BazaarAI.si" },
      { property: "og:description", content: "Your bookmarked AI tools." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { data: slugs = [], isLoading } = useQuery({
    queryKey: ["saved-tools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("saved_tools").select("tool_slug").order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((r) => r.tool_slug);
    },
  });

  const saved = slugs.map((s) => getTool(s)).filter((t) => t !== undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="flex items-center gap-2 text-3xl font-extrabold md:text-4xl">
        <Bookmark className="h-7 w-7 text-primary" /> Saved Tools
      </h1>
      <p className="mt-2 text-muted-foreground">Everything you've bookmarked, in one place.</p>
      {isLoading ? (
        <p className="mt-8 text-muted-foreground">Loading…</p>
      ) : saved.length === 0 ? (
        <div className="mt-8 rounded-xl border bg-card p-8 text-center shadow-card">
          <p className="text-muted-foreground">You haven't saved any tools yet.</p>
          <Link to="/tools" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground">
            Browse tools
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}
    </div>
  );
}
