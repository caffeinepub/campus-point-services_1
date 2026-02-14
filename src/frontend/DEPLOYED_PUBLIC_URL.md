# Deployed Public URL

This file records the live public URL of the Campus Point Services website after deployment to the Internet Computer.

## Current Deployment

**Status:** 🚀 Live

**Public URL:** `https://[canister-id].icp0.io/`

> **⚠️ ACTION REQUIRED:** Replace `[canister-id]` above with your actual canister ID from the deployment output.

**Previous URL (deprecated):** https://campus-point-services.icp0.io/

---

## Custom Domain Re-Mapping Required

### Important: Custom Domain Status

The custom ICP0 domain `https://campus-point-services.icp0.io/` is an **alias** that must be re-mapped to the new canister ID after each deployment.

**Current Status:** ⚠️ Needs re-mapping to new canister

**Why?** When a canister is redeployed with a new ID, the old custom domain alias still points to the previous (now deleted) canister, causing "Error 400 - Canister ID Not Resolved".

### How to Re-Map the Custom Domain

1. **Get your new canister ID** from the deployment output (format: `xxxxx-xxxxx-xxxxx-xxxxx-xxx`)
2. **Contact ICP0 support** or use the ICP0 domain management interface to update the alias
3. **Update the mapping** from the old canister ID to the new canister ID
4. **Wait 2-5 minutes** for DNS propagation
5. **Verify** by opening `https://campus-point-services.icp0.io/` in an incognito window

### Verification Checklist

After re-mapping the custom domain:

- [ ] Open `https://campus-point-services.icp0.io/` in incognito mode
- [ ] Confirm it loads the Campus Point Services homepage (not "Error 400")
- [ ] Compare content with `https://[canister-id].icp0.io/` (should be identical)
- [ ] Check that both URLs show the same enquiry form and content
- [ ] Verify the page title and branding match

### Troubleshooting Custom Domain

**Problem:** `https://campus-point-services.icp0.io/` shows "Error 400 - Canister ID Not Resolved"

**Solution:**
1. The domain is still mapped to the old (deleted) canister
2. Follow the re-mapping steps above to point it to the new canister ID
3. Wait 2-5 minutes for DNS propagation
4. Clear browser cache and try again in incognito mode

**Problem:** Custom domain shows old/cached content

**Solution:**
1. Clear browser cache completely
2. Try in incognito/private browsing mode
3. Wait a few more minutes for CDN cache to clear
4. Verify the new `https://[canister-id].icp0.io/` URL works correctly first

---

## How to Use This URL

1. **Open in browser:** Copy and paste the URL above to access your live website
2. **Share publicly:** Use either the `*.icp0.io` URL or the custom domain (after re-mapping)
3. **Google Search Console:** Use the `*.icp0.io` URL for verification (URL-prefix method)
4. **Sitemap submission:** Your sitemap is at: `https://[canister-id].icp0.io/sitemap.xml`

---

## Important Notes

- This is your **live production URL**, not a draft preview link
- The URL format `*.icp0.io` is the standard Internet Computer deployment domain
- Always use `https://` when sharing or submitting to search engines
- Include the trailing slash `/` for consistency
- The runtime app automatically updates `og:url` metadata to match the deployed origin
- **Custom domains require re-mapping** after each deployment with a new canister ID

---

## Troubleshooting

If the URL shows "Error 400 - Canister ID Not Resolved":
1. Wait 2-3 minutes after deployment for DNS propagation
2. Clear your browser cache and try again
3. Make sure you're using the exact URL above (copy-paste, don't type)
4. Try opening in an incognito/private browser window
5. Verify you replaced `[canister-id]` with the actual canister ID from deployment

If issues persist after 5 minutes, the canister may need to be redeployed with a new URL.

---

## Update Instructions

After a successful deployment with a new URL:
1. Replace `[canister-id]` above with the actual canister ID from the deployment output
2. Update the sitemap URL to match
3. Update `frontend/GOOGLE_INDEXING_GUIDE.md` with the same URL
4. Re-map the custom domain `campus-point-services.icp0.io` to the new canister ID
5. Verify both URLs work correctly
