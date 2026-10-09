import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { type Destination, type Guide, getAuthor, formatDate, guidesForDestination, categorySlug } from "@/data/scout";
import { cn } from "@/lib/utils";
import TravelIcon from "./TravelIcon";
import { editorialIcons } from "@/lib/travelIcons";

export const DestinationCard = ({ d, size = "md" }: { d: Destination; size?: "md" | "lg" }) => {
  const count = guidesForDestination(d.slug).length;
  return (
    <Link to={`/destinations/${d.slug}`} className="group relative block overflow-hidden rounded-lg bg-muted">
      <TravelIcon kind="route" className="absolute right-3 top-3 z-10 bg-card" />
      <div className={cn("overflow-hidden", size === "lg" ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/5]")}>
        <img src={d.image} alt={`${d.name}, ${d.country}`} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="bg-overlay-gradient absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">{d.country}</p>
        <h3 className="mt-1 text-2xl font-semibold md:text-[28px]">{d.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-primary-foreground/80">{d.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
          {count > 0 ? `${count} ${count === 1 ? "guide" : "guides"}` : "Destination guide"}
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

/** Editorial destination card with an explicit CTA, used on the discovery page. */
export const DestinationTile = ({ d }: { d: Destination }) => (
  <article className="group flex flex-col">
    <Link to={`/destinations/${d.slug}`} className="block overflow-hidden rounded-lg" tabIndex={-1} aria-hidden>
      <img src={d.image} alt="" loading="lazy" width={800} height={560} className="aspect-[7/5] w-full object-cover transition duration-700 group-hover:scale-105" />
    </Link>
    <p className="eyebrow mt-4 flex items-center gap-2"><TravelIcon kind="route" />{d.region}</p>
    <h3 className="mt-1 text-2xl font-semibold">
      <Link to={`/destinations/${d.slug}`} className="transition hover:text-accent">{d.name}, <span className="text-muted-foreground">{d.country}</span></Link>
    </h3>
    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{d.tagline}</p>
    <Link to={`/destinations/${d.slug}`} className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/80 px-4 py-2 text-xs font-semibold transition hover:border-accent hover:bg-accent hover:text-accent-foreground">
      Explore Guide <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  </article>
);

const Meta = ({ g, className }: { g: Guide; className?: string }) => (
  <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground", className)}>
    <span className="font-medium text-foreground/80">{getAuthor(g.author).name}</span>
    <span aria-hidden>·</span>
    <time dateTime={g.date}>{formatDate(g.date)}</time>
    <span aria-hidden>·</span>
    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{g.readTime} min read</span>
  </p>
);

export const GuideCard = ({ g, variant = "default" }: { g: Guide; variant?: "default" | "horizontal" | "compact" | "feature" }) => {
  const href = `/guides/${g.slug}`;
  const cat = (
    <Link to={`/guides?category=${categorySlug(g.category)}`} className="group eyebrow inline-flex items-center gap-2 hover:underline"><TravelIcon icon={editorialIcons[categorySlug(g.category) as keyof typeof editorialIcons]} />{g.category}</Link>
  );

  if (variant === "feature") {
    return (
      <article className="group grid overflow-hidden rounded-lg bg-card shadow-card md:grid-cols-5">
        <Link to={href} className="block overflow-hidden md:col-span-3" tabIndex={-1} aria-hidden>
          <img src={g.image} alt="" className="aspect-[16/10] h-full w-full object-cover transition duration-700 group-hover:scale-105 md:aspect-auto" />
        </Link>
        <div className="flex flex-col justify-center p-6 md:col-span-2 md:p-10">
          {cat}
          <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            <Link to={href} className="transition hover:text-accent">{g.title}</Link>
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{g.excerpt}</p>
          <Meta g={g} className="mt-6" />
        </div>
      </article>
    );
  }

  if (variant === "horizontal" || variant === "compact") {
    return (
      <article className="group flex gap-4">
        <Link to={href} className={cn("block shrink-0 overflow-hidden rounded", variant === "compact" ? "h-20 w-20" : "h-28 w-36 sm:h-32 sm:w-44")} tabIndex={-1} aria-hidden>
          <img src={g.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <div className="min-w-0">
          {cat}
          <h3 className={cn("mt-1 font-semibold leading-snug", variant === "compact" ? "text-base line-clamp-2" : "text-lg md:text-xl line-clamp-2")}>
            <Link to={href} className="transition hover:text-accent">{g.title}</Link>
          </h3>
          {variant === "horizontal" && <p className="mt-1 hidden text-sm text-muted-foreground line-clamp-2 sm:block">{g.excerpt}</p>}
          <Meta g={g} className="mt-2" />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <Link to={href} className="block overflow-hidden rounded-lg" tabIndex={-1} aria-hidden>
        <img src={g.image} alt="" loading="lazy" width={800} height={560} className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-105" />
      </Link>
      <div className="mt-4">{cat}</div>
      <h3 className="mt-2 text-xl font-semibold leading-snug md:text-2xl">
        <Link to={href} className="transition hover:text-accent">{g.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{g.excerpt}</p>
      <Meta g={g} className="mt-3" />
    </article>
  );
};

export const CategoryCard = ({ name, slug, description, active }: { name: string; slug: string; description?: string; active?: boolean }) => (
  <Link
    to={`/guides?category=${slug}`}
    className={cn(
      "group flex flex-col justify-between rounded-lg border p-5 transition hover:-translate-y-0.5 hover:border-accent",
      active ? "border-accent bg-accent/5" : "border-border bg-card",
    )}
  >
    <TravelIcon icon={editorialIcons[slug as keyof typeof editorialIcons]} className="mb-3" />
    <span className="font-display text-xl font-semibold">{name}</span>
    {description && <span className="mt-2 text-sm text-muted-foreground">{description}</span>}
    <ArrowUpRight className="mt-4 h-4 w-4 text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </Link>
);
