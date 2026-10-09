import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { PageHero } from "@/components/site/Section";
import Newsletter from "@/components/site/Newsletter";
import { authors, categories, images } from "@/data/scout";

const pillars = [
  { title: "Reported on the ground", text: "Every destination guide is written or updated by someone who has recently been there. We don't rewrite press releases." },
  { title: "Useful first", text: "Beautiful stories are nothing without practical detail. We include costs, timings and the things that go wrong." },
  { title: "Independent", text: "We never accept payment for coverage. When we're hosted by a hotel or tour operator, we say so clearly." },
  { title: "Respectful", text: "We highlight local businesses and voices, and encourage travel that leaves places better than we found them." },
];

const About = () => {
  const seo = ({ title: "About", description: "Travel Scout helps travellers discover destinations, experiences, food, culture and practical travel information. Meet the team." });
  return (
    <Layout seo={seo}>
      <PageHero eyebrow="About Travel Scout" title="Travel better. Explore deeper." intro="Travel Scout is an independent travel publication helping curious travellers discover destinations, experiences, food, culture and the practical information that turns a good trip into a great one." image={images.marrakech} imageAlt="A traveller walking through a lantern-lit souk in Marrakech" />

      <section className="container-site grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4"><p className="eyebrow mb-2">Our mission</p><h2 className="text-3xl font-semibold md:text-4xl">Helping you find places worth going.</h2></div>
        <div className="space-y-5 text-lg leading-relaxed text-foreground/85 md:col-span-7 md:col-start-6">
          <p>We started Travel Scout because too much travel content felt the same: the same lists, the same viewpoints, the same advice copied from site to site. We wanted guides that felt like advice from a well-travelled friend.</p>
          <p>Today our writers cover cities, coastlines and wild places across six continents, with a particular love for Africa — a continent that deserves far richer coverage than it usually gets.</p>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow mb-2">What we cover</p>
          <h2 className="mb-10 text-3xl font-semibold md:text-4xl">From street food to safari camps</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.slug}><Link to={`/guides?category=${c.slug}`} className="block h-full rounded-lg border border-border p-5 transition hover:border-accent"><span className="font-display text-xl font-semibold">{c.name}</span><span className="mt-2 block text-sm text-muted-foreground">{c.description}</span></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <p className="eyebrow mb-2">Why Travel Scout · Editorial philosophy</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">How we work</h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex gap-5">
              <span className="font-display text-4xl text-accent">0{i + 1}</span>
              <div><h3 className="text-2xl font-semibold">{p.title}</h3><p className="mt-2 text-muted-foreground">{p.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow mb-2">The team</p>
          <h2 className="mb-10 text-3xl font-semibold md:text-4xl">Meet our writers</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {authors.map((a) => (
              <li key={a.slug}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground" aria-hidden>{a.name.split(" ").map((n) => n[0]).join("")}</span>
                <p className="mt-4 font-display text-xl font-semibold">{a.name}</p>
                <p className="text-sm text-accent">{a.role} · {a.base}</p>
                <p className="mt-2 text-sm text-primary-foreground/70">{a.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="container-site scroll-mt-24 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div><p className="eyebrow mb-2">Contact</p><h2 className="text-3xl font-semibold md:text-4xl">Say hello</h2><p className="mt-3 text-muted-foreground">Story tips, corrections and partnership enquiries are always welcome. We read every message.</p></div>
          <a href="mailto:hello@travelscout.com" className="inline-flex w-fit items-center gap-3 rounded-full border border-foreground px-6 py-4 font-semibold transition hover:border-accent hover:bg-accent hover:text-accent-foreground">
            <Mail className="h-5 w-5" /> hello@travelscout.com
          </a>
        </div>
      </section>

      <Newsletter image={images.sydney} />
    </Layout>
  );
};

export default About;
