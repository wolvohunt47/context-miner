import type { ReactNode } from "react";
export function SimplePage({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
      <p className="mt-3 text-muted-foreground">{intro}</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
