import { Link, useParams } from "react-router-dom";
import { CalendarDays, Clock, Wallet, MapPin, Utensils, BedDouble, Lightbulb, Bus, ShieldCheck, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { PageHero, RelatedGuides } from "@/components/site/Section";
import { DestinationCard } from "@/components/site/Cards";
import Newsletter from "@/components/site/Newsletter";
import NotFound from "./NotFound";
import { getDestination, guidesForDestination, destinations, sortedGuides } from "@/data/scout";
import { useSeo } from "@/hooks/useSeo";

const Block = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <section className="border-t border-border py-8">
    <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold md:text-3xl">
      <Icon className="h-5 w-5 text-accent" aria-hidden /> {title}
    </h2>
    {children}
  </section>
);

const DestinationPage = () => {
  const { slug = "" } = useParams();
  const d = getDestination(slug);
  useSeo({
    title: d ? `${d.name}, ${d.country} Travel Guide` : "Destination not found",
    description: d ? `${d.tagline} Best time to visit, budget, things to do, where to eat and stay in ${d.name}.` : "This destination could not be found.",
  });
  if (!d) return <NotFound />;

  const own = guidesForDestination(d.slug);
  const related = own.length ? own : sortedGuides.filter((g) => destinations.find((x) => x.slug === g.destination)?.region === d.region);
  const nearby = destinations.filter((x) => x.region === d.region && x.slug !== d.slug).slice(0, 4);

  const facts = [
    { icon: CalendarDays, label: "Best time to visit", value: d.bestTime },
    { icon: Clock, label: "Recommended stay", value: d.duration },
    { icon: Wallet, label: "Estimated budget", value: d.budget },
  ];

  return (
    <Layout>
      <PageHero eyebrow={`${d.region} · ${d.country}`} title={`${d.name}, ${d.country}`} intro={d.tagline} image={d.image} imageAlt={`${d.name}, ${d.country}`} />

      <nav aria-label="Breadcrumb" className="container-site pt-6 text-xs text-muted-foreground">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link to="/destinations" className="hover:text-foreground">Destinations</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li aria-current="page" className="text-foreground">{d.name}</li>
        </ol>
      </nav>

      <div className="container-site grid gap-12 py-10 lg:grid-cols-12 lg:py-14">
        <div className="lg:col-span-8">
          <p className="font-display text-xl leading-relaxed text-foreground md:text-2xl">{d.intro}</p>

          <Block icon={MapPin} title="Popular attractions">
            <ul className="grid gap-2 sm:grid-cols-2">
              {d.attractions.map((a) => <li key={a} className="flex gap-2 text-foreground/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{a}</li>)}
            </ul>
          </Block>
          <Block icon={Lightbulb} title="Things to do">
            <ol className="space-y-3">
              {d.thingsToDo.map((t, i) => (
                <li key={t} className="flex gap-4"><span className="font-display text-xl text-accent">0{i + 1}</span><span className="pt-1 text-foreground/85">{t}</span></li>
              ))}
            </ol>
          </Block>
          <Block icon={Utensils} title="Where to eat">
            <dl className="grid gap-4 sm:grid-cols-3">
              {d.eat.map((e) => (
                <div key={e.name} className="rounded-lg bg-card p-5 shadow-card">
                  <dt className="font-display text-lg font-semibold">{e.name}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{e.note}</dd>
                </div>
              ))}
            </dl>
          </Block>
          <Block icon={BedDouble} title="Where to stay">
            <dl className="divide-y divide-border">
              {d.stay.map((s) => (
                <div key={s.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                  <dt className="w-44 shrink-0 font-semibold">{s.name}</dt>
                  <dd className="text-muted-foreground">{s.note}</dd>
                </div>
              ))}
            </dl>
          </Block>
          <Block icon={Lightbulb} title="Travel tips">
            <ul className="space-y-2">{d.tips.map((t) => <li key={t} className="flex gap-2 text-foreground/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}</li>)}</ul>
          </Block>
          <Block icon={Bus} title="Getting around"><p className="leading-relaxed text-foreground/85">{d.gettingAround}</p></Block>
          <Block icon={ShieldCheck} title="Safety & practical information"><p className="leading-relaxed text-foreground/85">{d.safety}</p></Block>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-lg bg-primary p-6 text-primary-foreground">
              <h2 className="mb-5 text-2xl font-semibold">At a glance</h2>
              <dl className="space-y-5">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-primary-foreground/60">{label}</dt>
                      <dd className="mt-0.5 font-medium">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            {own.length > 0 && (
              <a href="#latest-guides" className="block rounded-lg border border-border p-5 text-sm font-semibold transition hover:border-accent">
                Read {own.length} {d.name} {own.length === 1 ? "guide" : "guides"} →
              </a>
            )}
          </div>
        </aside>
      </div>

      <div id="latest-guides" className="scroll-mt-20">
        <RelatedGuides title={own.length ? `Latest ${d.name} guides` : `More from ${d.region}`} guides={related} link={{ to: "/guides", label: "All guides" }} className="border-t border-border" />
      </div>

      {nearby.length > 0 && (
        <section className="container-site pb-6">
          <h2 className="mb-8 text-3xl font-semibold">More in {d.region}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{nearby.map((x) => <DestinationCard key={x.slug} d={x} />)}</div>
        </section>
      )}
      <Newsletter />
    </Layout>
  );
};

export default DestinationPage;
