import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({ meta: [
    { title: "Affiliate Disclosure | BazaarAI.si" }, { name: "description", content: "How BazaarAI.si earns money from some links." },
    { property: "og:title", content: "Affiliate Disclosure | BazaarAI.si" }, { property: "og:description", content: "How BazaarAI.si earns money from some links." },
  ] }),
  component: () => <SimplePage title="Affiliate Disclosure" intro="How BazaarAI.si earns money from some links."><p>Some links may earn us a commission at no extra cost to you. This never affects scores or rankings.</p></SimplePage>,
});
