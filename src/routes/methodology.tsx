import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
export const Route = createFileRoute("/methodology")({
  head: () => ({ meta: [
    { title: "Methodology | BazaarAI.si" }, { name: "description", content: "How we review, score and rank AI tools and models." },
    { property: "og:title", content: "Methodology | BazaarAI.si" }, { property: "og:description", content: "How we review, score and rank AI tools and models." },
  ] }),
  component: () => <SimplePage title="Methodology" intro="How we review, score and rank AI tools and models."><p>Each tool is tested on real tasks, scored on quality, ease of use, pricing and privacy, and re-checked regularly.</p></SimplePage>,
});
