// DEMO DATA — clearly marked sample content for design review.
// Replace with verified, sourced records before production (no fake ratings or counts).

export type Tool = {
  slug: string;
  name: string;
  org: string;
  initials: string;
  tagline: string;
  description: string;
  tags: string[];
  pricing: "Free" | "Freemium" | "Paid" | "Open Source";
  category: string;
  url: string;
  bestFor: string;
  notIdealFor: string;
  models: string;
  integrations: string;
  lastVerified: string;
};

export const tools: Tool[] = [
  { slug: "chatgpt", name: "ChatGPT", org: "OpenAI", initials: "CG", tagline: "General-purpose AI assistant", description: "A conversational assistant for writing, coding, research, brainstorming and analysis.", tags: ["Chat", "Writing", "Coding"], pricing: "Freemium", category: "AI Chatbots", url: "https://chatgpt.com", bestFor: "General purpose assistance", notIdealFor: "Citations-first research", models: "GPT family", integrations: "API, Zapier, custom apps", lastVerified: "Demo" },
  { slug: "claude", name: "Claude", org: "Anthropic", initials: "CL", tagline: "Long-context reasoning assistant", description: "Assistant known for long documents, careful reasoning and writing quality.", tags: ["Long Context", "Analysis"], pricing: "Freemium", category: "AI Chatbots", url: "https://claude.ai", bestFor: "Long documents and analysis", notIdealFor: "Image generation", models: "Claude family", integrations: "API, MCP", lastVerified: "Demo" },
  { slug: "gemini", name: "Gemini", org: "Google", initials: "GM", tagline: "Multimodal assistant", description: "Google's multimodal assistant with deep Workspace integration.", tags: ["Multimodal", "Workspace"], pricing: "Freemium", category: "AI Chatbots", url: "https://gemini.google.com", bestFor: "Google Workspace users", notIdealFor: "Offline use", models: "Gemini family", integrations: "Workspace, API", lastVerified: "Demo" },
  { slug: "midjourney", name: "Midjourney", org: "Midjourney", initials: "MJ", tagline: "Artistic image generation", description: "Image generator focused on stylised, high-aesthetic results.", tags: ["Images", "Art"], pricing: "Paid", category: "Image Generation", url: "https://midjourney.com", bestFor: "Concept art and visuals", notIdealFor: "Precise text in images", models: "Proprietary", integrations: "Web, Discord", lastVerified: "Demo" },
  { slug: "cursor", name: "Cursor", org: "Anysphere", initials: "CU", tagline: "AI-first code editor", description: "Code editor with built-in AI pair programming and codebase chat.", tags: ["Code", "Productivity"], pricing: "Freemium", category: "Code & Dev", url: "https://cursor.com", bestFor: "Developers in large codebases", notIdealFor: "Non-coders", models: "Multiple providers", integrations: "VS Code extensions, Git", lastVerified: "Demo" },
  { slug: "perplexity", name: "Perplexity", org: "Perplexity", initials: "PX", tagline: "Answer engine with sources", description: "Real-time web search with cited answers.", tags: ["Search", "Research"], pricing: "Freemium", category: "Research", url: "https://perplexity.ai", bestFor: "Cited research", notIdealFor: "Long creative writing", models: "Multiple providers", integrations: "API, browser", lastVerified: "Demo" },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);

export const categories = [
  { name: "AI Chatbots", icon: "MessageSquare" },
  { name: "Image Generation", icon: "Image" },
  { name: "Video & Audio", icon: "Video" },
  { name: "Code & Dev", icon: "Code2" },
  { name: "Marketing", icon: "Megaphone" },
  { name: "Business", icon: "Briefcase" },
  { name: "Research", icon: "Search" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Productivity", icon: "CalendarCheck" },
  { name: "Design", icon: "PenTool" },
  { name: "Automation", icon: "Workflow" },
  { name: "MCP Servers", icon: "Server" },
] as const;

export const news = [
  { title: "New frontier model announced with stronger multimodal reasoning", source: "OpenAI", topic: "Model Releases", time: "2 hours ago", featured: true },
  { title: "Gemini update brings longer context to more users", source: "Google", topic: "Model Releases", time: "5 hours ago" },
  { title: "Anthropic publishes new safety research", source: "Anthropic", topic: "Research", time: "8 hours ago" },
  { title: "Runway releases new video generation model", source: "Runway", topic: "Tools & Products", time: "1 day ago" },
  { title: "Hugging Face hub passes another models milestone", source: "Hugging Face", topic: "Open Source", time: "2 days ago" },
];

export const newsTopics = ["All News", "Model Releases", "Company Updates", "Tools & Products", "Research", "Funding & Business", "AI Agents", "MCP & Integrations", "Open Source"];

export const models = [
  { name: "GPT-4o", org: "OpenAI", context: "128K", input: "$5.00", output: "$15.00", multimodal: "Yes", bestFor: "General" },
  { name: "Claude 3.5", org: "Anthropic", context: "200K", input: "$3.00", output: "$15.00", multimodal: "Yes", bestFor: "Analysis" },
  { name: "Gemini 1.5", org: "Google", context: "1M", input: "$3.50", output: "$10.50", multimodal: "Yes", bestFor: "Multimodal" },
  { name: "Llama 3 70B", org: "Meta", context: "8K", input: "Free", output: "Free", multimodal: "No", bestFor: "Open Source" },
];

export const sampleStack = [
  { step: "Research", tool: "Perplexity", note: "Find trending topics and research.", price: "Free" },
  { step: "Script", tool: "ChatGPT", note: "Generate engaging scripts.", price: "Free" },
  { step: "Image / Visuals", tool: "Flux", note: "Create thumbnails and visuals.", price: "Free" },
  { step: "Voice", tool: "ElevenLabs", note: "Convert text to realistic voice.", price: "Free tier" },
  { step: "Video Generation", tool: "Pika", note: "Generate and edit videos.", price: "Free tier" },
  { step: "Automation", tool: "n8n", note: "Automate the entire workflow.", price: "Open source" },
];
