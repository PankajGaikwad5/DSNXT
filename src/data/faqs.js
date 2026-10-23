export const FAQS = [
  {
    q: "What does the free preview actually include?",
    a: "A real, working homepage designed for your business, not a mood board. You see it before you pay anything. If it doesn't feel right, you walk away and owe nothing.",
  },
  {
    q: "How long does a website take?",
    a: "Your preview is ready in 48 to 72 hours. Once you approve it, most sites go live in 7 to 10 days. Larger builds take two to three weeks.",
  },
  {
    q: "Why not WordPress, Wix or Squarespace?",
    a: "Templates make you look like everyone else, and plugins make you slow. We hand-code every site, so it loads in well under a second and looks like nobody else's.",
  },
  {
    q: "Do I own the website?",
    a: "Completely. The code, the domain and the content are yours. There are no page-builder subscriptions and no lock-in.",
  },
  {
    q: "I get work through referrals. Do I still need this?",
    a: "Referrals look you up before they call. A great site turns that search into a booked meeting instead of a quiet second thought.",
  },
];

/* The full set, grouped, for the FAQ page. Written as direct answers so search and AI assistants can quote them. */
export const FAQ_GROUPS = [
  {
    title: "Working with Design Next",
    items: [
      ...FAQS,
      {
        q: "What does Design Next do?",
        a: "Design Next is an independent web design and development studio based in Mumbai, India. It designs and hand-codes custom websites in Next.js for architects, interior designers, artists, creators and premium brands, and handles SEO, hosting setup and launch.",
      },
      {
        q: "Do you work with clients outside Mumbai and India?",
        a: "Yes. Design Next works remotely with clients across India and internationally, including Qatar, the UAE and the wider Middle East, Australia, the UK and the US. Calls, previews and handover all happen online, so location makes no difference to the result.",
      },
      {
        q: "How much does a custom website cost?",
        a: "Every project gets one fixed quote after a short call, based on the number of pages and features. There are no monthly page-builder fees and no surprise add-ons, and you see a free homepage preview before you commit.",
      },
    ],
  },
  {
    title: "AI website builders vs a professional studio",
    items: [
      {
        q: "Can I build my business website with AI instead of hiring a web designer?",
        a: "You can get a basic site from an AI website builder in minutes, and for a hobby project that is often enough. For a business that wins clients on trust and taste, an AI-generated site usually looks like thousands of others, is hard to customise past the template, and is rarely optimised for speed or search. A professional studio designs around your positioning, writes clean code and sets up SEO properly.",
      },
      {
        q: "Are AI-generated websites good for SEO?",
        a: "Usually only at a basic level. AI builders tend to produce generic copy, repeated layouts and heavy scripts, which hurt rankings and load times. Strong SEO needs original content, a clear page structure, fast Core Web Vitals and structured data, all of which Design Next builds in by hand.",
      },
      {
        q: "I started a website with an AI tool. Can you take it from here?",
        a: "Yes. Design Next can review what you have, keep the content that works, and redesign and rebuild the site properly in Next.js so it is faster, distinctive and fully owned by you. The free homepage preview shows you the difference before you decide.",
      },
      {
        q: "When is it worth hiring a professional instead of using Wix, Squarespace, Framer or an AI builder?",
        a: "When your website directly affects revenue: when clients compare you with competitors, judge your quality from your site, or find you through Google. A custom-built site gives you a distinct look, sub-second loading and full ownership of the code, with no platform lock-in.",
      },
    ],
  },
  {
    title: "Speed, SEO and ownership",
    items: [
      {
        q: "Why do you build websites with Next.js?",
        a: "Next.js serves pages that are prepared in advance and delivered from servers close to the visitor, so sites load in well under a second, score highly on Google's Core Web Vitals and are easy for search engines to read.",
      },
      {
        q: "Will my website show up on Google?",
        a: "Every Design Next site launches with technical SEO in place: clean page structure, metadata, structured data, an XML sitemap, fast loading and Google Search Console set up and submitted. Ranking also depends on competition and content, and the site is built to give you the best possible footing.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. Where you need to edit content regularly, such as projects, articles or products, a content management system is set up so you can update it without touching code.",
      },
      {
        q: "Can you maintain or update my website after launch?",
        a: "Yes. Design Next looks after websites after launch, including sites it didn't build: content and image updates, new pages, fixes, security and dependency updates, and speed and SEO check-ups. Maintenance is charged separately from the build, either quoted per request for occasional changes or as a simple monthly plan for sites that change often.",
      },
      {
        q: "Where is my website hosted, and what does hosting cost?",
        a: "Design Next sites are hosted on Vercel, the platform built by the makers of Next.js, which serves your site from fast servers around the world. Vercel's free plan covers most small business websites, so hosting usually costs nothing. Only if your site outgrows the free limits do you move to Vercel's paid plan, billed by Vercel directly with no markup from us. The hosting account is set up in your name.",
      },
    ],
  },
];
