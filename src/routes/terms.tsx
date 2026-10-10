import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Use | BazaarAI.si" }, { name: "description", content: "The rules for using BazaarAI.si." },
    { property: "og:title", content: "Terms of Use | BazaarAI.si" }, { property: "og:description", content: "The rules for using BazaarAI.si." },
  ] }),
  component: () => <SimplePage title="Terms of Use" intro="The rules for using BazaarAI.si."><p>Content is for information only. Check each tool's own terms before use.</p></SimplePage>,
});
