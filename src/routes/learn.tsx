import { createFileRoute, Link } from "@tanstack/react-router";
import { sampleStack } from "@/lib/data";
const guides = [
  { t: "AI basics for beginners", d: "What AI models are and how to pick one." },
  { t: "Prompting 101", d: "Write prompts that get great results." },
  { t: "Build your first AI workflow", d: "Chain tools together to automate a task." },
  { t: "Earn with AI", d: "Freelancing, content and products powered by AI." },
];
export const Route = createFileRoute("/learn")({
  head: () => ({ meta: [
    { title: "Learn AI — Guides & Workflows | BazaarAI.si" }, { name: "description", content: "Beginner guides and ready-made AI workflows." },
    { property: "og:title", content: "Learn AI | BazaarAI.si" }, { property: "og:description", content: "Beginner guides and ready-made AI workflows." },
  ] }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">Learn & Build</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => <div key={g.t} className="rounded-xl border bg-card p-5 shadow-card"><div className="font-semibold">{g.t}</div><p className="mt-1 text-sm text-muted-foreground">{g.d}</p></div>)}
      </div>
      <h2 className="mt-12 text-2xl font-bold">Sample workflow: YouTube automation</h2>
      <ol className="mt-4 space-y-2">{sampleStack.map((s, i) => <li key={s.step} className="rounded-lg border bg-card p-3 text-sm"><b>{i + 1}. {s.step}</b> — {s.tool}</li>)}</ol>
      <Link to="/finder" className="mt-6 inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Build my own stack</Link>
    </div>
  ),
});
