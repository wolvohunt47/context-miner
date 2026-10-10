import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | BazaarAI.si" }, { name: "description", content: "What data we collect and how we use it." },
    { property: "og:title", content: "Privacy Policy | BazaarAI.si" }, { property: "og:description", content: "What data we collect and how we use it." },
  ] }),
  component: () => <SimplePage title="Privacy Policy" intro="What data we collect and how we use it."><p>We collect only what is needed to run the site, such as your email if you subscribe. We never sell your data.</p></SimplePage>,
});
