import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
export const Route = createFileRoute("/editorial-policy")({
  head: () => ({ meta: [
    { title: "Editorial Policy | BazaarAI.si" }, { name: "description", content: "Our standards for accuracy, independence and corrections." },
    { property: "og:title", content: "Editorial Policy | BazaarAI.si" }, { property: "og:description", content: "Our standards for accuracy, independence and corrections." },
  ] }),
  component: () => <SimplePage title="Editorial Policy" intro="Our standards for accuracy, independence and corrections."><p>Rankings are never sold. News is sourced from primary announcements and corrected openly when wrong.</p></SimplePage>,
});
