---
title: Why does my website say "Not secure"?
description: Browsers show "Not secure" when a site doesn't use a valid HTTPS connection. Here's what the warning means, why it appears and how to fix it, usually for free.
date: 2026-11-11
keywords: website says not secure, not secure warning, website not secure fix, ssl certificate expired, how to get https, your connection is not private
---

**The short answer:** the warning means your site isn't using a valid HTTPS connection. Either it has no SSL certificate, the certificate has expired, or part of the page is still loading insecurely. Most hosts offer free certificates, so the fix is usually quick and shouldn't cost much.

Your site hasn't necessarily been hacked. But visitors don't know that, and many will leave the moment they see the warning, especially before filling in a form or paying.

## Which problem do you have?

| What you see | What it usually means |
|---|---|
| **"Not secure" beside the address** | The site is on `http://`, with no working certificate |
| **A full-page "Your connection is not private" warning** | The certificate has expired or doesn't match your domain |
| **Works on some pages but not others** | Those pages load images or scripts over `http://` (called *mixed content*) |
| **Works with `www` but not without, or the reverse** | The certificate covers only one version of your domain |

## How to fix it

1. **Check your hosting dashboard for SSL or HTTPS.** Most hosts provide free certificates through Let's Encrypt, often with one click. Modern platforms such as Vercel, Shopify, Wix and Squarespace include them automatically.
2. **Make sure it renews automatically.** Certificates last for a limited time, and an expired one triggers the worst warning of all.
3. **Redirect all `http://` traffic to `https://`.** That way every visitor and search engine lands on the secure version.
4. **Fix mixed content.** Update any images, scripts or embeds that still use `http://` addresses.
5. **Check both versions of your domain,** with and without `www`.

Don't pay a large fee for a certificate unless you have a specific reason. For a typical business site, a free one gives the same padlock and the same encryption.

## Need someone to fix it?

[Design Next](/services) fixes security warnings and hosting setup on existing websites, including sites it didn't build. If your site keeps running into problems like this, a [monthly care plan](/services#maintenance) covers it.

## Questions

### Does "Not secure" mean my website was hacked?

Not usually. It normally means the site has no valid SSL certificate or has one that has expired. A hacked site tends to show different signs, such as strange redirects, unknown pages or a red warning screen from Google.

### Does HTTPS affect my Google ranking?

Yes, a little. Google has treated HTTPS as a ranking signal for years. The bigger cost is that visitors leave when they see a warning, so fixing it matters whatever it does for rankings.
