---
title: How do I connect my domain to my website?
description: Connecting a domain means pointing it at your website's host with DNS records or nameservers. Here's how it works, how long it takes and how to avoid breaking your email.
date: 2026-11-05
keywords: how to connect domain to website, connect domain to hosting, point domain to website, dns settings for website, domain not working, change nameservers
---

**The short answer:** you connect a domain by logging in to where you bought it (the registrar) and pointing it at your website's host, using the records your host gives you. You'll either add DNS records or change nameservers. The change usually works within a few hours, though it can take up to 48.

## The two pieces

- **Your domain** is your address, such as `yourbusiness.com`. It's registered with a company like GoDaddy, Namecheap or Cloudflare.
- **Your website** lives with a host, such as Vercel, Shopify, Wix, Squarespace or a hosting company.

They're often separate companies, and connecting them just tells the internet where your address should lead.

## How to connect them

1. **Find your host's instructions.** In your website platform, look for "Domains" or "Connect a domain" and add your domain. It will show you exactly which records to use.
2. **Log in to your domain registrar** and open the DNS settings.
3. **Add the records your host gave you.** Typically that's:
   - an **A record** for the main domain, which points to an IP address,
   - a **CNAME record** for `www`, which points to another address.
4. **Remove any old conflicting records** for the same names.
5. **Wait, then check.** Most changes appear within a few hours. Your host will usually turn on HTTPS by itself once the domain connects.

Some hosts ask you to change **nameservers** instead. That hands all your domain's settings over to the host, so read the next section first.

## Don't break your email

Your email runs on the same domain through **MX records**. Before changing nameservers, take a screenshot of all your DNS records and make sure the MX records (plus any SPF and DKIM records) are copied across. Missing them is the most common way a website launch takes email down with it. Adding A and CNAME records alone doesn't normally affect email.

## If it isn't working

- **Old site still showing:** give it time, and test on mobile data.
- **"Not secure" warning:** the certificate may still be setting up. See [why a website says "Not secure"](/guides/website-says-not-secure).
- **Works with `www` but not without:** one of the two records is missing, or a redirect hasn't been set.

## One thing to check now

Make sure the domain is registered **in your name, on your account**, not your developer's. Losing access to a domain is one of the most painful problems a business can have.

## Want it done for you?

[Design Next](/services) handles domains, DNS and email records at launch, and helps with hosting and domains on its [monthly plans](/services#maintenance).

## Questions

### How long does it take for a domain to connect?

Usually a few minutes to a few hours, but DNS changes can take up to 48 hours to reach everyone. During that time, some people may see the old site and others the new one.

### Will changing my domain settings affect my email?

Adding website records usually won't. Changing nameservers can, because your email's MX records must be recreated at the new provider. Save a copy of your DNS records before making any change.
