# Deployed Public URL

This file records the live public URL of the Campus Point Services website after deployment to the Internet Computer.

## Current Deployment

**Status:** 🚀 Live

**Public URL:** `https://[canister-id].icp0.io/`

**Previous URL (deprecated):** https://campus-point-services.icp0.io/

---

## How to Use This URL

1. **Open in browser:** Copy and paste the URL above to access your live website
2. **Share publicly:** This is your official public website link
3. **Google Search Console:** Use this exact URL for verification (URL-prefix method)
4. **Sitemap submission:** Your sitemap is at: `https://[canister-id].icp0.io/sitemap.xml`

---

## Important Notes

- This is your **live production URL**, not a draft preview link
- The URL format `*.icp0.io` is the standard Internet Computer deployment domain
- Always use `https://` when sharing or submitting to search engines
- Include the trailing slash `/` for consistency
- The runtime app automatically updates `og:url` metadata to match the deployed origin

---

## Troubleshooting

If the URL shows "Error 400 - Canister ID Not Resolved":
1. Wait 2-3 minutes after deployment for DNS propagation
2. Clear your browser cache and try again
3. Make sure you're using the exact URL above (copy-paste, don't type)
4. Try opening in an incognito/private browser window

If issues persist after 5 minutes, the canister may need to be redeployed with a new URL.

---

## Update Instructions

After a successful deployment with a new URL:
1. Replace `[canister-id]` above with the actual canister ID from the deployment output
2. Update the sitemap URL to match
3. Update `frontend/GOOGLE_INDEXING_GUIDE.md` with the same URL
