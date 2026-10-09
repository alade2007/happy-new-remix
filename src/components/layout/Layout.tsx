import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Seo, { type SeoProps } from "@/components/site/Seo";
import Footer from "./Footer";

const Layout = ({ children, seo }: { children: React.ReactNode; seo?: SeoProps }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      {seo && <Seo {...seo} />}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
