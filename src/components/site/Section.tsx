import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GuideCard } from "./Cards";
import type { Guide } from "@/data/scout";

export const SectionHeader = ({ eyebrow, title, link, intro, id }: { eyebrow?: string; title: string; intro?: string; link?: { to: string; label: string }; id?: string }) => (
  <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold md:text-[42px] md:leading-[1.1]">{title}</h2>
      {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
    </div>
    {link && (
      <Link to={link.to} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent">
        {link.label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    )}
  </div>
);

export const PageHero = ({ eyebrow, title, intro, image, children, imageAlt }: { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; children?: React.ReactNode }) =>
  image ? (
    <section className="relative isolate overflow-hidden">
      <img src={image} alt={imageAlt ?? ""} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="bg-overlay-gradient absolute inset-0 -z-10" />
      <div className="container-site flex min-h-[52vh] flex-col justify-end pb-12 pt-28 text-primary-foreground md:min-h-[60vh] md:pb-16">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  ) : (
    <section className="border-b border-border">
      <div className="container-site py-14 md:py-20">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  );

export const RelatedGuides = ({ title, guides, link, className }: { title: string; guides: Guide[]; link?: { to: string; label: string }; className?: string }) =>
  guides.length ? (
    <section className={cn("container-site py-14 md:py-20", className)}>
      <SectionHeader title={title} link={link} />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {guides.slice(0, 3).map((g) => <GuideCard key={g.slug} g={g} />)}
      </div>
    </section>
  ) : null;

export const Chip = ({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-foreground/40",
    )}
  >
    {children}
  </button>
);

export const EmptyState = ({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) => (
  <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-muted-foreground">{text}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);
