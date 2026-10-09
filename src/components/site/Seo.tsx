import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE = "Travel Scout";
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) || "https://happy-new-remix.lovable.app";

export interface SeoProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

const abs = (u: string) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`);

const Seo = ({ title, description, type = "website", image, jsonLd, noindex }: SeoProps) => {
  const { pathname } = useLocation();
  const full = title === SITE ? `${SITE} — Discover places worth going` : `${title} | ${SITE}`;
  const url = `${SITE_URL}${pathname}`;
  return (
    <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" />
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={abs(image)} />}
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={abs(image)} />}
      {noindex && <meta name="robots" content="noindex" />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
