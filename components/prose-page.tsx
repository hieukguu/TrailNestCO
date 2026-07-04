import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion";

export function ProsePage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <section className="pb-24 pt-[calc(var(--header-h)+64px)]">
      <div className="container-site max-w-3xl">
        <FadeIn>
          <span className="kicker">{kicker}</span>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            {title}
          </h1>
          {updated && (
            <p className="mt-3 text-sm text-pine-900/50">Last updated: {updated}</p>
          )}
          <div className="prose-page mt-10 space-y-4 leading-relaxed text-pine-900/80 [&_a]:font-semibold [&_a]:text-ember-600 [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pine-950 [&_li]:ml-5 [&_li]:list-disc">
            {children}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
