import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Logo from "@/components/site/Logo";
import { NewsletterForm } from "@/components/site/Newsletter";

const Pinterest = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.78-.17-1.98.03-2.83l1.17-4.97s-.3-.6-.3-1.48c0-1.39.8-2.42 1.8-2.42.85 0 1.26.64 1.26 1.4 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.8 1.48 1.8 1.77 0 3.14-1.87 3.14-4.57 0-2.39-1.72-4.06-4.17-4.06-2.84 0-4.5 2.13-4.5 4.33 0 .86.33 1.78.74 2.28.08.1.09.18.07.28l-.28 1.13c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.97-.53-2.29-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.62A10 10 0 1 0 12 2Z" />
  </svg>
);

const socials = [
  { label: "Instagram", href: "https://instagram.com/travelscout", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/travelscout", Icon: Facebook },
  { label: "X (Twitter)", href: "https://x.com/travelscout", Icon: Twitter },
  { label: "Pinterest", href: "https://pinterest.com/travelscout", Icon: Pinterest },
  { label: "YouTube", href: "https://youtube.com/@travelscout", Icon: Youtube },
];

const links = [
  { label: "Destinations", to: "/destinations" },
  { label: "Travel Guides", to: "/guides" },
  { label: "Travel Tips", to: "/travel-tips" },
  { label: "Food & Culture", to: "/food-culture" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const regionsLinks = ["Africa", "Europe", "Asia", "Middle East", "North America", "Oceania"];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-site grid gap-12 py-16 md:grid-cols-12">
      <div className="md:col-span-4">
        <Logo inverted />
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
          Travel guides, hidden gems, local experiences and practical advice — for travellers who want to explore the world better.
        </p>
        <ul className="mt-6 flex gap-2">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Travel Scout on ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 transition hover:border-accent hover:bg-accent">
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <nav aria-label="Footer" className="md:col-span-2">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">Explore</h2>
        <ul className="space-y-2.5 text-sm">
          {links.map((l) => (
            <li key={l.label}><Link to={l.to} className="text-primary-foreground/80 transition hover:text-accent">{l.label}</Link></li>
          ))}
        </ul>
      </nav>
      <div className="md:col-span-2">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">Regions</h2>
        <ul className="space-y-2.5 text-sm">
          {regionsLinks.map((r) => (
            <li key={r}><Link to={`/destinations?region=${encodeURIComponent(r)}`} className="text-primary-foreground/80 transition hover:text-accent">{r}</Link></li>
          ))}
        </ul>
      </div>
      <div id="newsletter" className="md:col-span-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Get travel inspiration in your inbox.</h2>
        <p className="mb-5 mt-2 text-sm text-primary-foreground/70">One thoughtful email every two weeks. No spam, unsubscribe anytime.</p>
        <NewsletterForm dark id="nl-footer" />
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container-site flex flex-col gap-2 py-6 text-xs text-primary-foreground/50 sm:flex-row sm:justify-between">
        <p>© 2026 Travel Scout. All rights reserved.</p>
        <p>Independent travel journalism. Discover places worth going.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
