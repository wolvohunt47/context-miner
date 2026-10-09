import { createFileRoute } from "@tanstack/react-router";
import { models } from "@/lib/data";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "AI Model Comparison — GPT vs Claude vs Gemini vs Llama | BazaarAI.si" },
      { name: "description", content: "Compare AI models side by side: context window, pricing, multimodal support and best use." },
      { property: "og:title", content: "AI Model Comparison | BazaarAI.si" },
      { property: "og:description", content: "Compare leading AI models side by side." },
    ],
  }),
  component: Compare,
});

const rows: [string, keyof (typeof models)[number]][] = [
  ["Context window", "context"], ["Input price / 1M", "input"], ["Output price / 1M", "output"], ["Multimodal", "multimodal"], ["Best for", "bestFor"],
];

function Compare() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">Model Comparison</h1>
      <p className="mt-2 text-muted-foreground">Compare AI models side by side. Sample figures — verify against official pricing.</p>
      <div className="mt-8 overflow-x-auto rounded-2xl border bg-card shadow-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left text-muted-foreground">Model</th>
              {models.map((m) => <th key={m.name} className="p-4 text-left"><div className="font-display text-base font-bold">{m.name}</div><div className="text-xs font-normal text-muted-foreground">{m.org}</div></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, key]) => (
              <tr key={label} className="border-b last:border-0">
                <td className="p-4 font-medium">{label}</td>
                {models.map((m) => <td key={m.name} className={`p-4 font-mono ${m[key] === "Yes" ? "text-success" : ""}`}>{m[key]}</td>)}
              </tr>
            ))}
            <tr><td />{models.map((m) => <td key={m.name} className="p-4"><button className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">Try Now</button></td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
