# Google Search Console Setup Guide

Complete step-by-step instructions to verify your Campus Point Services website on Google Search Console and submit your sitemap for indexing.

---

## Your Live Website URL

**Important:** Use this exact URL for all steps below:

**`https://[canister-id].icp0.io/`**

Replace `[canister-id]` with your actual canister ID from the deployment output.

**Sitemap URL:** `https://[canister-id].icp0.io/sitemap.xml`

---

## Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **"Add Property"** or **"Start Now"**

---

## Step 2: Choose Verification Method

You have two options:

### Option A: URL Prefix (Recommended)

1. Select **"URL prefix"** property type
2. Enter your full URL: `https://[canister-id].icp0.io/`
3. Click **"Continue"**

### Option B: Domain Property

1. Select **"Domain"** property type
2. Enter: `[canister-id].icp0.io`
3. Follow DNS verification steps (requires DNS access)

**We recommend Option A (URL prefix)** as it's simpler for Internet Computer deployments.

---

## Step 3: Verify Ownership

Google will show several verification methods. The **HTML tag method** is already set up in your website:

1. Select **"HTML tag"** verification method
2. Google will show a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. **Your website already includes this tag** in `frontend/index.html`
4. Click **"Verify"**

✅ If verification succeeds, you'll see a success message!

---

## Step 4: Submit Your Sitemap

After verification is complete:

1. In Google Search Console, go to **"Sitemaps"** in the left sidebar
2. Under **"Add a new sitemap"**, enter: `sitemap.xml`
3. Click **"Submit"**

Google will now start crawling and indexing your website pages.

---

## Step 5: Monitor Indexing Status

1. Go to **"Pages"** in the left sidebar
2. Check the **"Why pages aren't indexed"** section
3. Wait 24-48 hours for Google to crawl your sitemap

---

## Troubleshooting

### Verification Failed

- **Check the URL:** Make sure you entered `https://[canister-id].icp0.io/` exactly (with `https://` and trailing `/`)
- **Wait for DNS:** If you just deployed, wait 2-3 minutes for DNS propagation
- **Clear cache:** Try opening the URL in an incognito window first
- **Check meta tag:** Verify the Google verification meta tag is in your `<head>` section

### Sitemap Not Found

- **Check sitemap URL:** Visit `https://[canister-id].icp0.io/sitemap.xml` directly in your browser
- **Wait for deployment:** Ensure your latest deployment is live
- **Use relative path:** In Google Search Console, enter just `sitemap.xml` (not the full URL)

### Pages Not Indexed

- **Be patient:** Initial indexing can take 1-7 days
- **Check robots.txt:** Visit `https://[canister-id].icp0.io/robots.txt` to ensure it allows crawling
- **Request indexing:** Use the URL Inspection tool to manually request indexing for specific pages

---

## Important Notes

- **Indexing takes time:** Google typically indexes new sites within 1-7 days
- **Regular updates:** Google will automatically re-crawl your sitemap periodically
- **Mobile-first:** Google primarily uses mobile versions for indexing
- **HTTPS required:** Your site uses HTTPS by default (✓)

---

## Next Steps After Setup

1. **Monitor performance:** Check the "Performance" report weekly
2. **Fix issues:** Address any coverage or mobile usability issues
3. **Update content:** Keep your website content fresh and relevant
4. **Build backlinks:** Get other websites to link to yours for better ranking

---

## Support Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Sitemap Protocol](https://www.sitemaps.org/)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

**Last Updated:** February 14, 2026
