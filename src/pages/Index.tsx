import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SearchBox from "@/components/site/SearchBox";
import { DestinationCard, GuideCard, CategoryCard } from "@/components/site/Cards";
import { SectionHeader } from "@/components/site/Section";
import Newsletter from "@/components/site/Newsletter";
import { destinations, sortedGuides, guidesByTag, guidesByCategory, categories, images } from "@/data/scout";

const featuredSlugs = ["lagos", "cape-town", "zanzibar", "dubai", "paris", "london", "tokyo", "new-york"];

const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.5 } };

const Index = () => {
  const seo = ({
    title: "Travel Scout",
    description: "Travel guides, hidden gems, local experiences, food, culture and practical tips to help you explore the world better.",
  });

  const featured = featuredSlugs.map((s) => destinations.find((d) => d.slug === s)!);
  const trending = destinations.filter((d) => d.trending);
  const lead = guidesByTag("featured")[0];
  const latest = sortedGuides.filter((g) => g.slug !== lead.slug).slice(0, 6);
  const hidden = guidesByTag("hidden-gem");
  const tips = guidesByCategory("Travel Tips").concat(guidesByCategory("Solo Travel")).slice(0, 4);
  const foodCulture = guidesByCategory("Food & Culture").slice(0, 3);
  const inspiration = guidesByTag("inspiration").slice(0, 4);

  return (
    <Layout seo={seo}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={images.zanzibar} alt="A traditional dhow sailing off a Zanzibar beach at sunset" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1600} height={1008} />
        <div className="bg-overlay-gradient absolute inset-0 -z-10" />
        <div className="container-site flex min-h-[88vh] flex-col justify-end pb-14 pt-32 md:min-h-[84vh] md:pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-primary-foreground">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Travel guides · Hidden gems · Local culture</p>
            <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-8xl">Discover places <em className="font-normal">worth</em> going.</h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/85 md:text-lg">
              Travel guides, hidden gems, local experiences, food, culture and practical tips to help you explore the world better.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/destinations" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110">
                Explore Destinations <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/guides" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground hover:text-primary">
                Read Travel Guides
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative z-10 mt-10 max-w-xl">
            <SearchBox variant="hero" />
          </motion.div>
        </div>
      </section>

      {/* Featured destinations */}
      <section className="container-site py-16 md:py-24" aria-labelledby="featured-dest">
        <SectionHeader id="featured-dest" eyebrow="Featured destinations" title="Where to go next" link={{ to: "/destinations", label: "All destinations" }} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((d, i) => (
            <motion.div key={d.slug} {...fade} transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}>
              <DestinationCard d={d} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured guide */}
      <section className="container-site pb-16 md:pb-24" aria-label="Featured guide">
        <motion.div {...fade}><GuideCard g={lead} variant="feature" /></motion.div>
      </section>

      {/* Latest + Trending */}
      <section className="border-y border-border bg-card">
        <div className="container-site grid gap-14 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader eyebrow="Fresh from the field" title="Latest travel guides" link={{ to: "/guides", label: "All guides" }} />
            <div className="grid gap-10 sm:grid-cols-2">
              {latest.slice(0, 4).map((g) => <GuideCard key={g.slug} g={g} />)}
            </div>
          </div>
          <aside className="lg:col-span-4" aria-labelledby="trending">
            <p className="eyebrow mb-2">Right now</p>
            <h2 id="trending" className="mb-6 text-3xl font-semibold">Trending destinations</h2>
            <ol className="space-y-4">
              {trending.map((d, i) => (
                <li key={d.slug}>
                  <Link to={`/destinations/${d.slug}`} className="group flex items-center gap-4">
                    <span className="w-6 font-display text-2xl text-accent">{i + 1}</span>
                    <img src={d.image} alt="" loading="lazy" className="h-16 w-16 rounded object-cover" />
                    <span>
                      <span className="block font-display text-xl font-semibold transition group-hover:text-accent">{d.name}</span>
                      <span className="text-xs text-muted-foreground">{d.country}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* Hidden gems */}
      <section className="container-site py-16 md:py-24" aria-labelledby="hidden">
        <SectionHeader id="hidden" eyebrow="Off the beaten path" title="Hidden gems" intro="The places our writers return to when the crowds go elsewhere." />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {hidden.slice(0, 3).map((g) => <GuideCard key={g.slug} g={g} />)}
        </div>
      </section>

      {/* Travel tips */}
      <section className="bg-primary text-primary-foreground" aria-labelledby="tips">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-2">Travel smarter</p>
            <h2 id="tips" className="text-3xl font-semibold md:text-[42px] md:leading-[1.1]">Travel tips that actually help</h2>
            <p className="mt-4 text-primary-foreground/70">Packing, money, safety and booking advice from writers who are on the road most of the year.</p>
            <Link to="/travel-tips" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110">
              All travel tips <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 [&_h3]:text-primary-foreground [&_p]:text-primary-foreground/60">
            {tips.map((g) => <GuideCard key={g.slug} g={g} variant="compact" />)}
          </div>
        </div>
      </section>

      {/* Food & culture */}
      <section className="container-site py-16 md:py-24" aria-labelledby="food">
        <SectionHeader id="food" eyebrow="Eat, listen, learn" title="Food & culture" link={{ to: "/food-culture", label: "More food & culture" }} />
        <div className="grid gap-8 lg:grid-cols-2">
          <Link to={`/guides/${foodCulture[0].slug}`} className="group relative block overflow-hidden rounded-lg">
            <img src={images.food} alt="A cook serving jollof rice beside a suya grill at a Lagos market" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 lg:h-full" />
            <div className="bg-overlay-gradient absolute inset-0" />
            <div className="absolute bottom-0 p-6 text-primary-foreground md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{foodCulture[0].category}</p>
              <h3 className="mt-2 text-3xl font-semibold">{foodCulture[0].title}</h3>
            </div>
          </Link>
          <div className="flex flex-col justify-center gap-8">
            {foodCulture.slice(1).map((g) => <GuideCard key={g.slug} g={g} variant="horizontal" />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-site pb-16 md:pb-24" aria-labelledby="cats">
        <SectionHeader id="cats" eyebrow="Browse by interest" title="Find your kind of trip" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.slug} {...c} />)}
        </div>
      </section>

      {/* Inspiration */}
      <section className="border-t border-border bg-card" aria-labelledby="insp">
        <div className="container-site py-16 md:py-24">
          <SectionHeader id="insp" eyebrow="Daydream" title="Travel inspiration" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {inspiration.map((g) => <GuideCard key={g.slug} g={g} />)}
          </div>
        </div>
      </section>

      <Newsletter image={images.aurora} />
    </Layout>
  );
};

export default Index;
