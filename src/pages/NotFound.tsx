import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const seo = ({ title: "Page not found", description: "The page you were looking for doesn't exist." });
  return (
    <Layout seo={seo}>
      <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-4xl font-semibold md:text-6xl">This trail goes nowhere.</h1>
        <p className="mt-4 max-w-md text-muted-foreground">The page you're looking for has moved or never existed. Let's get you back on the map.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent">Back home</Link>
          <Link to="/destinations" className="rounded-full border border-foreground px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent">Explore destinations</Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
