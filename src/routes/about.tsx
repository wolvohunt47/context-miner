import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About BazaarAI.si | BazaarAI.si" }, { name: "description", content: "AI का पूरा बाजार — the complete marketplace to discover, learn, build and earn with AI." },
    { property: "og:title", content: "About BazaarAI.si | BazaarAI.si" }, { property: "og:description", content: "AI का पूरा बाजार — the complete marketplace to discover, learn, build and earn with AI." },
  ] }),
  component: () => <SimplePage title="About BazaarAI.si" intro="AI का पूरा बाजार — the complete marketplace to discover, learn, build and earn with AI."><p>We help beginners and pros find the right AI for any goal, with honest comparisons, daily news and ready-made AI stacks.</p></SimplePage>,
});
