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
    <section className="bg-sand-50 pb-20 pt-[calc(var(--header-h)+48px)] sm:pb-24 sm:pt-[calc(var(--header-h)+64px)]">
      <div className="container-site max-w-3xl">
        <FadeIn>
          <span className="kicker">{kicker}</span>
          <h1 className="text-balance font-display text-4xl font-bold leading-tight tracking-[-0.025em] sm:text-5xl">
            {title}
          </h1>
          {updated && (
            <p className="mt-3 text-sm text-pine-900/50">Last updated: {updated}</p>
          )}
          <div className="prose-page mt-9 space-y-5 text-[17px] leading-[1.8] text-pine-800 [&_a]:font-semibold [&_a]:text-ember-600 [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-pine-950 [&_li]:ml-5 [&_li]:list-disc sm:mt-10">
            {children}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
