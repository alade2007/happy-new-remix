import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utils";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Travel Guides", to: "/guides" },
  { label: "Travel Tips", to: "/travel-tips" },
  { label: "Food & Culture", to: "/food-culture" },
  { label: "About", to: "/about" },
];

export const scrollToNewsletter = () =>
  document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth", block: "center" });

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-all",
      isActive ? "text-foreground after:w-full" : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {navItems.map((i) => (
            <NavLink key={i.to} to={i.to} end={i.to === "/"} className={linkClass}>
              {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="rounded-full p-2.5 text-foreground/70 transition hover:bg-muted hover:text-foreground"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X className="h-[18px] w-[18px]" /> : <Search className="h-[18px] w-[18px]" />}
          </button>
          <button
            onClick={scrollToNewsletter}
            className="hidden sm:inline-flex ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
          >
            Newsletter
          </button>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden rounded-full p-2.5 text-foreground/80 hover:bg-muted"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background"
          >
            <div className="container-site py-5">
              <SearchBox autoFocus onNavigate={() => setSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-primary/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-[86vw] max-w-sm flex-col bg-background p-6 shadow-2xl lg:hidden"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-muted" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6">
                <SearchBox onNavigate={() => setOpen(false)} compact />
              </div>
              <nav className="mt-6 flex flex-col">
                {navItems.map((i) => (
                  <NavLink
                    key={i.to}
                    to={i.to}
                    end={i.to === "/"}
                    className={({ isActive }) =>
                      cn("border-b border-border py-3.5 font-display text-2xl transition", isActive ? "text-accent" : "text-foreground hover:text-accent")
                    }
                  >
                    {i.label}
                  </NavLink>
                ))}
              </nav>
              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(scrollToNewsletter, 300);
                }}
                className="mt-auto rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition"
              >
                Get the newsletter
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
