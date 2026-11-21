# SEO, AEO & GEO handoff

Last updated: 2026-11-21. Covers designnext.co only. For blog topics and publishing order, see `BLOG-PLAN.md`.

**Goal:** get Design Next recommended when anyone, anywhere, asks Google, ChatGPT, Gemini, Perplexity or Claude who can build their website, Shopify store or brand. The target is international clients, not Mumbai.

## Status at a glance

| Area | State |
|---|---|
| Crawl access (robots, sitemap, server-rendered HTML) | Done, verified live |
| `llms.txt` | Done, rewritten for international positioning |
| IndexNow (Bing, which ChatGPT search relies on) | Done, first submission accepted on 2026-11-21 |
| Schema (Organization, Person, WebSite, FAQPage, BlogPosting, Breadcrumbs, CreativeWork) | Done, with gaps listed below |
| International positioning | Done on 2026-11-21 |
| General keywords in visible copy | Done on 2026-11-21 |
| Case study depth | **Open:** the biggest on-site gap |
| Directory profiles and reviews | **Open:** the biggest gap overall |
| Bing index check | **Open** |
| Core Web Vitals | **Unmeasured** |

## Rules and decisions

- **Positioning:** Design Next is an international studio. Mumbai, India appears only as the studio's address (About, Contact, footer, schema `address`), in the founder page's "Based in" line, in time-zone answers on location pages, and where clients are located. Don't put Mumbai back into titles, descriptions, the hero or keywords.
- **Location pages** (`/web-design-mumbai`, `-usa`, `-dubai-qatar`, `-australia`, `-worldwide`) stay live as background pages. The Mumbai page is labelled "India" in the footer and `llms.txt` and has sitemap priority 0.6.
- **Two identities, kept separate:**
  - pankajgaikwad.online is the independent freelancer ("hire me").
  - designnext.co is the studio, which Pankaj founded ("hire us"). The studio also does more than websites: Shopify, brand direction and SEO.
  - Don't merge or redirect them. The founder Person schema links to the personal site through `sameAs`.
- **Wording:** use "Hire us from anywhere", not "hire us remotely", which reads as a limitation.
- **Be factual:** never claim clients, countries or results that aren't real. Today the real international work is Qatar (current client) and Australia (timyule.au, finished). The UK and US are target markets, not existing clients. Prices stay hidden.
- **No keyword stuffing:** each main term appears where it reads naturally. Slogan headlines stay.

## Changes made on 2026-11-21

1. **IndexNow:** the key file is `public/9b04e844dcd7e040d4b30fcd67366439.txt`, the script is `scripts/indexnow.mjs`, and it runs with `npm run indexnow`. Don't rename or delete the key file.
2. **Profiles list:** `SITE.profiles` in `src/data/site.js` feeds the Organization `sameAs`. Add every new public profile there.
3. **Founder link:** the founder Person schema has `sameAs: pankajgaikwad.online` (`src/lib/seo.js`).
4. **Heading word fix:** split-line headings used to reach crawlers as joined words ("makeyou", "newhomepage"). Fixed in `src/components/Motion.js` (`Lines`) and `src/components/Hero.js`. Any new multi-line heading needs a space between lines.
5. **International repositioning:**
   - Site title, description, OG image text and keywords (`src/app/layout.js`, `src/app/opengraph-image.js`)
   - Schema description and `areaServed`, worldwide first; Mumbai neighbourhoods and geo coordinates removed (`src/lib/seo.js`)
   - Hero and homepage copy
   - Metadata on the services, work, contact, FAQ, guides, website-development and founder pages
   - FAQs (`src/data/faqs.js`)
   - Footer order
   - Sitemap priorities, with `UPDATED` set to 2026-11-21
   - `llms.txt`
   - Guide examples changed to London, Dubai, Manchester and Chelsea
6. **Keywords from the research, added to visible copy:**
   - Terms added: custom web design agency/studio, website design and development, small businesses, Shopify ecommerce, branding, UI/UX
   - Pages: homepage statement and "What we do", service descriptions, services label ("Website design services") and intro, About
   - New FAQs: "Are you a web design agency or a freelancer?" (homepage), "Do you design websites for small businesses?" and "Can you build an ecommerce website or online store?" (FAQ page)
7. **Next.js** upgraded from 16.4.1 to 16.4.6 for security fixes. Without it, the build refuses to finish.
8. **Guide published:** "How do I get my business on Google Maps?"

## What the research found

**Why AI tools recommend pankajgaikwad.online and not designnext.co.** The leads came from general questions ("who can make me a website"), not from people searching Pankaj's name.
- The personal site's homepage uses the words people ask with: "freelance", "hire", "UK/US/international". designnext.co used brand language and was framed as Mumbai-only until 2026-11-21.
- The personal site has had longer to be indexed: it was registered in July 2026, while designnext.co launched in October 2026.
- "Design Next" shares its name with other studios (a Dribbble "designnext" profile, an ArchDaily "Design Next Agency", Next Webdesign). "Pankaj Gaikwad" is unique.

**Directories win searches by country.** For "website design company Qatar", "web design agency Dubai", UK freelancers and Next.js agencies, nearly every top result is a Clutch list page, with DesignRush and GoodFirms next. Clutch also publishes text versions of those lists for AI tools (`clutch.co/qa/web-designers.md`). A studio's own site can't get it onto those lists; a profile and reviews can.

**Wording that ranks.** Top pages use literal phrases:
- "Custom Web Design Company/Services"
- "Hire Shopify Experts, Developers, Designers"
- "Website Design for Small Businesses"
- "Custom Brand & Website Design"
- "Websites for Architects, Interior Designers"
- "free quote/audit/estimate". Design Next's equivalent is the free homepage preview; keep it prominent.

**Awwwards and Behance.** Awwwards ranks for inspiration ("best agency websites"), not for hiring searches, and its agency directory is a paid tier. Dribbble and Behance service pages do appear in hiring searches. Framer Experts only applies to Framer builds.

## Open work, in priority order

### Owner: Pankaj (off-site, highest impact)

1. **Bing Webmaster Tools:** compare indexed pages for designnext.co and pankajgaikwad.online. If designnext.co has few, fix that first. ChatGPT search relies on Bing.
2. **Clutch profile, plus 2–3 client reviews.** Clutch ranks by reviews. This is the main route into the "top web design companies in [country]" lists that AI tools quote.
3. **Shopify Partner Directory** (it ranks for "hire Shopify expert"), then **DesignRush**, **GoodFirms**, and **Dribbble and Behance service listings**.
4. **Google Business Profile**, **Bing Places**, and a **LinkedIn company page**.
5. **Client credits:** ask clients for a "Website by Design Next" footer link. Karan Desai, Timothy Yule and PKD Studio are live sites.
6. **Consistency:** use the same name and description everywhere: "Design Next (designnext.co), custom web design & Shopify studio, working worldwide". Then add each profile URL to `SITE.profiles`.
7. **Is the Dribbble "designnext" profile yours?** If yes, add it to `SITE.profiles`. If not, always write "Design Next (designnext.co)" in full.

### Owner: developer (on-site)

1. **Expand the case studies** (`src/data/projects.js`, `/work/[slug]`). They're about 150–185 words each. Add the brief, the approach, what was built and real outcomes only, about 400–600 words each, with a short FAQ. This is the biggest on-site GEO gap.
2. **Shorten titles over about 65 characters, including the " | Design Next" suffix:**
   - About (75), FAQ (68), Preview (72), Shopify developer (81), Web design USA (68)
   - Work (76), Cuddles case study (74)
   - Guides: interior-designer-website (90), why-your-website-is-not-showing-on-google (82), how-to-choose-a-web-designer (70)
3. **Shorten descriptions over about 170 characters.** The worst are the homepage (252), website-development-company (257), Australia (253), interior-designer guide (233) and Dubai-Qatar (223). Google cuts these off; AI tools read them in full, so it's cosmetic, not urgent.
4. **Add BreadcrumbList schema** to Contact, Preview and Work.
5. **Measure Core Web Vitals** with PageSpeed Insights on mobile for the homepage, a work page and a guide. The site uses three.js, GSAP and video, so check LCP and INP.
6. **Decide on "social media templates"** in `services.js` (Brand direction), services one-offs and `llms.txt`. The offer scope says no graphic design.
7. **Three lint errors from before this work** (`Cursor.js`, `Nav.js`, `lib/scroll.js`: setState in an effect, refs during render). They don't affect SEO, but they're worth clearing.

## Routines

- **After every deploy:** `npm run indexnow`, which submits all sitemap URLs. For a single new guide: `npm run indexnow -- /guides/<slug>`. The deploy has to be live first.
- **New guide:** follow `BLOG-PLAN.md`: move it from drafts, set `date`, add it to `llms.txt`, then run IndexNow.
- **New page:** add it to `PAGES` in `src/app/sitemap.js` and to `llms.txt`. Give it a plain-language title, a direct-answer intro, an FAQ block with `faqPage` schema, and breadcrumbs.
- **New public profile:** add its URL to `SITE.profiles`.
- **Monthly check:** ask ChatGPT (with search), Gemini and Perplexity the same prompts and note whether Design Next or pankajgaikwad.online is mentioned:
  - "Who can design a custom website for my small business?"
  - "Best web design studio for an architecture firm"
  - "Hire a Shopify expert to design my store"
  - "Website design company in Qatar" (and UK, Dubai, Australia)
  - "Freelance web designer for an interior designer website"
  - "Who can rebuild my Wix site properly?"
- **GA4:** watch referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com` and `claude.ai`. Compare against pankajgaikwad.online.
