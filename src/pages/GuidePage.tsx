import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Facebook, Link2, Twitter, Lightbulb, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { RelatedGuides } from "@/components/site/Section";
import Newsletter from "@/components/site/Newsletter";
import NotFound from "./NotFound";
import { getGuide, getAuthor, formatDate, sortedGuides, getDestination, categorySlug, type Block } from "@/data/scout";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/lib/utils";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Initials = ({ name, size = "md" }: { name: string; size?: "md" | "lg" }) => (
  <span className={cn("flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground", size === "lg" ? "h-16 w-16 text-lg" : "h-10 w-10 text-sm")} aria-hidden>
    {name.split(" ").map((n) => n[0]).join("")}
  </span>
);

const renderBlock = (b: Block, i: number) => {
  switch (b.type) {
    case "h2": return <h2 key={i} id={slugify(b.text)} className="scroll-mt-24 pt-6 text-3xl font-semibold">{b.text}</h2>;
    case "p": return <p key={i}>{b.text}</p>;
    case "list": return <ul key={i} className="space-y-2 pl-1">{b.items.map((x) => <li key={x} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{x}</li>)}</ul>;
    case "quote": return (
      <blockquote key={i} className="border-l-2 border-accent py-1 pl-6">
        <p className="font-display text-2xl italic leading-snug text-foreground">“{b.text}”</p>
        {b.cite && <footer className="mt-3 text-sm text-muted-foreground">— {b.cite}</footer>}
      </blockquote>
    );
    case "tip": return (
      <aside key={i} className="rounded-lg border border-accent/30 bg-accent/5 p-5">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-accent"><Lightbulb className="h-4 w-4" />{b.title}</p>
        <p className="text-base text-foreground/85">{b.text}</p>
      </aside>
    );
    case "img": return (
      <figure key={i} className="-mx-5 md:mx-0">
        <img src={b.src} alt={b.caption} loading="lazy" className="w-full md:rounded-lg" />
        <figcaption className="mt-2 px-5 text-sm text-muted-foreground md:px-0">{b.caption}</figcaption>
      </figure>
    );
  }
};

const GuidePage = () => {
  const { slug = "" } = useParams();
  const g = getGuide(slug);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState("");

  useSeo({ title: g?.title ?? "Guide not found", description: g?.excerpt ?? "This guide could not be found.", type: "article" });

  const toc = useMemo(() => (g ? g.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text })) : []), [g]);

  useEffect(() => {
    if (!toc.length) return;
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-20% 0px -70% 0px" });
    toc.forEach((t) => { const el = document.getElementById(t.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [toc]);

  if (!g) return <NotFound />;

  const author = getAuthor(g.author);
  const dest = g.destination ? getDestination(g.destination) : undefined;
  const idx = sortedGuides.findIndex((x) => x.slug === g.slug);
  const newer = sortedGuides[idx - 1];
  const older = sortedGuides[idx + 1];
  const related = sortedGuides.filter((x) => x.slug !== g.slug && (x.category === g.category || x.destination === g.destination));
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareBtn = "flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:border-accent hover:bg-accent hover:text-accent-foreground";

  return (
    <Layout>
      <article>
        <header className="container-site max-w-4xl pt-12 text-center md:pt-16">
          <Link to={`/guides?category=${categorySlug(g.category)}`} className="eyebrow hover:underline">{g.category}</Link>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] md:text-6xl">{g.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{g.excerpt}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3 text-left">
              <Initials name={author.name} />
              <div className="text-sm">
                <p className="font-semibold">{author.name}</p>
                <p className="text-muted-foreground"><time dateTime={g.date}>{formatDate(g.date)}</time> · <Clock className="inline h-3 w-3" /> {g.readTime} min read</p>
              </div>
            </div>
            <div className="flex gap-2" aria-label="Share this article">
              <a className={shareBtn} href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(g.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><Twitter className="h-4 w-4" /></a>
              <a className={shareBtn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></a>
              <button className={shareBtn} onClick={copy} aria-label="Copy link">{copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}</button>
            </div>
          </div>
        </header>

        <figure className="container-site mt-10 md:mt-14">
          <img src={g.image} alt={g.title} className="aspect-[16/9] w-full rounded-lg object-cover md:aspect-[21/9]" />
        </figure>

        <div className="container-site grid gap-12 py-12 md:py-16 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            {toc.length > 0 && (
              <nav aria-label="Table of contents" className="sticky top-24">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">In this guide</p>
                <ol className="space-y-2 border-l border-border">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className={cn("-ml-px block border-l-2 py-1 pl-4 text-sm transition", active === t.id ? "border-accent font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-[17px] leading-[1.8] text-foreground/85 md:text-lg [&>p:first-child]:font-display [&>p:first-child]:text-2xl [&>p:first-child]:leading-relaxed [&>p:first-child]:text-foreground">
              {g.body.map(renderBlock)}
            </div>

            {dest && (
              <aside className="mt-12 rounded-lg bg-card p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Related links</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold">
                  <li><Link to={`/destinations/${dest.slug}`} className="text-accent hover:underline">{dest.name} destination guide →</Link></li>
                  <li><Link to={`/destinations?region=${encodeURIComponent(dest.region)}`} className="text-accent hover:underline">More destinations in {dest.region} →</Link></li>
                </ul>
              </aside>
            )}

            <section className="mt-12 flex gap-5 border-t border-border pt-10" aria-label="About the author">
              <Initials name={author.name} size="lg" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Written by</p>
                <p className="mt-1 font-display text-2xl font-semibold">{author.name}</p>
                <p className="text-sm text-accent">{author.role} · Based in {author.base}</p>
                <p className="mt-3 text-muted-foreground">{author.bio}</p>
              </div>
            </section>

            <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="More articles">
              {older ? (
                <Link to={`/guides/${older.slug}`} className="group rounded-lg border border-border p-5 transition hover:border-accent">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft className="h-3 w-3" />Previous</span>
                  <span className="mt-2 block font-display text-lg font-semibold group-hover:text-accent">{older.title}</span>
                </Link>
              ) : <span />}
              {newer && (
                <Link to={`/guides/${newer.slug}`} className="group rounded-lg border border-border p-5 text-right transition hover:border-accent">
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next<ArrowRight className="h-3 w-3" /></span>
                  <span className="mt-2 block font-display text-lg font-semibold group-hover:text-accent">{newer.title}</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </article>

      <RelatedGuides title="You might also like" guides={related} className="border-t border-border" />
      <Newsletter />
    </Layout>
  );
};

export default GuidePage;
