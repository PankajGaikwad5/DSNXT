import { SITE, LOGO } from "@/data/site";

export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;

export const AREAS = {
  mumbai: ["Mumbai", "Navi Mumbai", "Thane", "Bandra", "Andheri", "Juhu", "Worli", "Lower Parel", "Powai", "Colaba"],
  india: ["Pune", "Goa", "Bengaluru", "Delhi NCR", "Ahmedabad", "Hyderabad"],
  world: ["United Arab Emirates", "United Kingdom", "United States", "Australia", "Singapore", "Canada"],
};

/** Renders schema.org data. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The studio as an entity: who it is, where, what it does. Used site-wide. */
export function studioGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: SITE.name,
        alternateName: ["DSNXT", "Design Next Studio"],
        url: SITE.url,
        logo: { "@type": "ImageObject", url: LOGO.black, width: 678, height: 126 },
        image: LOGO.black,
        email: SITE.email,
        description:
          "Design Next is an independent web design and development studio in Mumbai, India. It designs and hand-codes fast, custom websites in Next.js for architects, interior designers, artists and premium brands in Mumbai and worldwide, and shows every client a free working homepage preview before they pay.",
        slogan: "Websites that make you the obvious choice.",
        foundingLocation: { "@type": "Place", name: "Mumbai, India" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 19.076, longitude: 72.8777 },
        areaServed: [
          ...AREAS.mumbai.map((name) => ({ "@type": "City", name })),
          { "@type": "Country", name: "India" },
          ...AREAS.world.map((name) => ({ "@type": "Country", name })),
        ],
        knowsAbout: [
          "Web design",
          "Website development",
          "Custom website design",
          "Next.js development",
          "React",
          "UI/UX design",
          "Website redesign",
          "Landing page design",
          "Technical SEO",
          "Local SEO",
          "Core Web Vitals",
          "Website performance optimisation",
          "WebGL and Three.js",
          "Websites for architects",
          "Websites for interior designers",
          "Portfolio websites for artists",
        ],
        sameAs: [SITE.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE.email,
          areaServed: ["IN", "AE", "GB", "US", "AU", "SG", "CA"],
          availableLanguage: ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web design and development services",
          itemListElement: [
            "Custom website design",
            "Next.js website development",
            "Website redesign",
            "Landing page design and development",
            "Technical and local SEO",
            "Free homepage preview",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function faqPage(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema({ name, description, path, areas }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE.url}${path}`,
    provider: { "@id": ORG_ID },
    serviceType: "Web design and development",
    areaServed: areas.map((name) => ({ "@type": "Place", name })),
  };
}

/** Shared metadata shape for a page: canonical, OG and Twitter all in step. */
export function pageMeta({ title, description, path, keywords = [], image }) {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path || "/" },
    openGraph: { title, description, url, type: "website", ...(image ? { images: [image] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}
