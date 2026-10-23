import { SITE, LOGO } from "@/data/site";

export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;
export const PERSON_ID = `${SITE.url}/founder#person`;

export const AREAS = {
  mumbai: ["Mumbai", "Navi Mumbai", "Thane", "Bandra", "Andheri", "Juhu", "Worli", "Lower Parel", "Powai", "Colaba"],
  india: ["Pune", "Goa", "Bengaluru", "Delhi NCR", "Ahmedabad", "Hyderabad"],
  world: ["Qatar", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Australia", "Singapore", "Canada"],
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
        telephone: SITE.tel,
        founder: { "@id": PERSON_ID },
        description:
          "Design Next is an independent web design and development studio in Mumbai, India, led by designer-developer Pankaj Gaikwad. It designs and hand-codes fast, custom websites in Next.js and Shopify for architects, interior designers, artists and premium brands in Mumbai, across India and internationally, including Qatar, the UAE, the UK and Australia, and shows every client a free working homepage preview before they pay.",
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
          "Freelance web development",
          "Shopify development",
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
          telephone: SITE.tel,
          areaServed: ["IN", "QA", "AE", "SA", "GB", "US", "AU", "SG", "CA"],
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
            "Website maintenance and updates",
            "Free homepage preview",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Pankaj Gaikwad",
        jobTitle: "Founder, web designer and developer",
        url: `${SITE.url}/founder`,
        worksFor: { "@id": ORG_ID },
        homeLocation: { "@type": "Place", name: "Mumbai, India" },
        knowsAbout: ["Web design", "Next.js", "React", "Shopify", "WebGL", "Technical SEO"],
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
// A page's own openGraph replaces the root one, which drops the site-wide share card, so name it explicitly.
const SHARE_IMAGE = { url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: "Design Next, web design studio in Mumbai" };

export function pageMeta({ title, description, path, keywords = [], image = SHARE_IMAGE }) {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path || "/" },
    openGraph: { title, description, url, type: "website", siteName: SITE.name, locale: "en_IN", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
