---
title: Why is my website contact form not sending emails?
description: If enquiries from your website's contact form aren't arriving, the cause is usually spam filtering, a wrong address or a mail setup problem. Here's how to find which one and fix it.
date: 2026-11-05
type: answer
keywords: contact form not sending emails, website form not working, not receiving emails from website, contact form emails going to spam, website enquiries not arriving
---

**The short answer:** most contact forms that seem broken are actually working, but their emails are landing in spam or being rejected because the website isn't properly allowed to send mail from your domain. Check your spam folder first, then test the form yourself. If nothing arrives, the fix is usually to send form emails through a proper email service.

This one is worth fixing today. A broken form loses enquiries silently: nobody tells you they tried to reach you.

## Find the cause in 5 minutes

1. **Send a test.** Fill in your own form from your phone, using a different email address from the one that receives enquiries.
2. **Check spam and promotions folders.** If it's there, the form works and the problem is how the email is sent.
3. **Check the receiving address.** Forms often still point to an old address, or a developer's address from when the site was built.
4. **Look at what the form does.** If it shows an error or spins forever, the form itself is broken. If it says "thank you" and nothing arrives, the email is being lost after sending.

## The usual causes and fixes

- **Emails are going to spam.** The form sends from an address the receiving mail server doesn't trust. Your domain needs SPF, DKIM and DMARC records, which are settings that prove mail from your domain is genuine.
- **The server's built-in mail is blocked.** Many websites send using their hosting server, and those emails are often rejected. Sending through a dedicated email service, or SMTP on a WordPress site, is far more reliable.
- **The form sends "from" the visitor's address.** Mail providers reject this as spoofing. Send from your own domain and put the visitor's address in the reply-to field.
- **The anti-spam check has broken.** An expired or misconfigured CAPTCHA can quietly stop every submission.
- **A plan or plugin has lapsed.** Form services can stop sending after a free limit, and an update can break an old plugin.

## Stop it happening again

Send enquiries to two places, such as your email and a saved list or WhatsApp, so one failure never loses a lead. Test the form every month, and always after a website change.

## Need someone to fix it?

[Design Next](/services) repairs forms and email setup on existing websites, including sites it didn't build, and can [look after your site monthly](/services#maintenance) so problems like this get caught early.

## Questions

### Why do my website form emails go to spam?

Usually because your domain's SPF, DKIM and DMARC records are missing or wrong, or because the form sends from an address that doesn't match your domain. Sending through a proper email service from your own domain normally solves it.

### How do I know if my contact form is working?

Submit it yourself from your phone, using a different email address from the one that receives enquiries, then confirm the message arrives in the inbox and not in spam. Repeat the test monthly and after any website change.
