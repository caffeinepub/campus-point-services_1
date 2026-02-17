# Google Search Console Setup Guide

Complete step-by-step instructions to verify your Campus Point Services website on Google Search Console and submit your sitemap for indexing.

---

## Your Live Website URLs

**Short URL (for sharing):** `https://campus-point-services.icp0.io/`

**Direct Canister URL (for verification):** `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/`

**Sitemap URL:** `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/sitemap.xml`

---

## Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **"Add Property"** or **"Start Now"**

---

## Step 2: Add Your Property

### Choose URL Prefix Method

1. Select **"URL prefix"** (not Domain)
2. Enter your **direct canister URL**: `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/`
3. Click **"Continue"**

> **Why use the direct canister URL?** The HTML meta tag verification method works best with the direct canister URL. Once verified, you can also add the short alias URL as an additional property.

---

## Step 3: Verify Ownership

### HTML Tag Method (Recommended)

1. Google will show you a verification meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

2. **Good news!** This tag is already added to your website:
   ```html
   <meta name="google-site-verification" content="-eP00qAgdJLpMvyhkklEU5NoIbnqC0wSDVmadERYarI" />
   ```

3. Click **"Verify"** in Google Search Console

4. If verification succeeds, you're done! If not, wait a few minutes and try again.

---

## Step 4: Submit Your Sitemap

1. In Google Search Console, go to **"Sitemaps"** in the left sidebar
2. Enter your sitemap URL: `sitemap.xml` (just the filename, not the full URL)
3. Click **"Submit"**

Your full sitemap URL is: `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/sitemap.xml`

---

## Step 5: Add Short Alias URL (Optional)

To also track the short URL in Search Console:

1. Click **"Add Property"** again
2. Select **"URL prefix"**
3. Enter: `https://campus-point-services.icp0.io/`
4. Verify using the same HTML tag method
5. Submit the sitemap again for this property

---

## Verification Checklist

- [ ] Added property in Google Search Console
- [ ] Used direct canister URL: `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/`
- [ ] Verified ownership using HTML tag method
- [ ] Submitted sitemap: `sitemap.xml`
- [ ] (Optional) Added short alias URL as additional property
- [ ] Waited 24-48 hours for initial indexing

---

## What Happens Next?

1. **Immediate:** Google confirms your ownership
2. **Within 24 hours:** Google starts crawling your sitemap
3. **Within 1-2 weeks:** Your pages begin appearing in search results
4. **Ongoing:** Monitor performance in Search Console dashboard

---

## Troubleshooting

### Verification Failed

**Problem:** Google can't verify the meta tag

**Solutions:**
1. Wait 5-10 minutes and try again (DNS propagation)
2. Clear your browser cache and verify the tag is visible in page source
3. Try in incognito mode: view source of `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/`
4. Ensure you're using the direct canister URL, not the short alias

### Sitemap Not Found

**Problem:** Google can't access the sitemap

**Solutions:**
1. Verify the sitemap URL directly in your browser: `https://5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io/sitemap.xml`
2. Make sure you entered just `sitemap.xml` in the submission field
3. Wait 24 hours and check the status again
4. Try submitting the full URL if the relative path doesn't work

### No Pages Indexed

**Problem:** Sitemap submitted but no pages indexed after 1 week

**Solutions:**
1. Check "Coverage" report in Search Console for errors
2. Verify your sitemap is valid XML
3. Request indexing manually for your homepage
4. Ensure your site is publicly accessible (not behind authentication)
5. Check that robots.txt allows crawling

---

## Important Notes

- Use the **direct canister URL** (`5s7ow-6yaaa-aaaap-qkmha-cai.icp0.io`) for initial verification
- The **short alias URL** (`campus-point-services.icp0.io`) can be added as an additional property
- Both URLs point to the same content and will be indexed
- The canonical URL tag ensures Google knows the preferred URL is the short alias
- Indexing typically takes 1-2 weeks for new sites
- Monitor your Search Console dashboard regularly for insights

---

## Support

If you encounter issues:
1. Check the [Google Search Console Help Center](https://support.google.com/webmasters)
2. Review the "Coverage" and "Sitemaps" reports for specific errors
3. Ensure your website is accessible and loads correctly
4. Wait 24-48 hours between verification attempts
