# Deployed Public URL

This file records the live public URL of the Campus Point Services website after deployment to the Internet Computer.

## Current Deployment

**Status:** 🚀 Live (Draft Version 10)

**Public URL:** `https://[canister-id].icp0.io/`

> **⚠️ ACTION REQUIRED:** Replace `[canister-id]` above with your actual canister ID from the deployment output.

**Custom Domain:** `https://campus-point-services.icp0.io/`

**Custom Domain Status:** ⚠️ Re-mapping in progress to new canister

---

## Custom Domain Re-Mapping (Draft Version 10)

### Background

The custom ICP0 domain `https://campus-point-services.icp0.io/` was previously mapped to an older canister that has been deleted. Draft Version 10 has been deployed with a new canister ID, and the custom domain needs to be re-mapped to point to this new canister.

### Re-Mapping Process

**What happened:**
1. Previous canister (old ID) was deleted
2. Draft Version 10 deployed with new canister ID: `[canister-id]`
3. Custom domain `campus-point-services.icp0.io` still pointed to old (deleted) canister
4. Result: "Error 400 - Canister ID Not Resolved" when accessing custom domain

**Re-mapping steps:**
1. **Identify new canister ID** from deployment output (format: `xxxxx-xxxxx-xxxxx-xxxxx-xxx`)
2. **Access ICP0 domain management** interface or contact ICP0 support
3. **Update the alias mapping:**
   - From: `campus-point-services.icp0.io` → old canister ID (deleted)
   - To: `campus-point-services.icp0.io` → new canister ID from Draft Version 10
4. **Wait 2-5 minutes** for DNS/CDN propagation
5. **Verify** the custom domain now serves the new deployment

### Verification Checklist

After re-mapping the custom domain:

- [ ] Open `https://campus-point-services.icp0.io/` in incognito mode
- [ ] Confirm it loads the Campus Point Services homepage (not "Error 400")
- [ ] Compare content with `https://[canister-id].icp0.io/` (should be identical)
- [ ] Check that both URLs show the same enquiry form and content
- [ ] Verify the page title shows "Campus Point Services"
- [ ] Test the enquiry form submission on both URLs
- [ ] Check that navigation and all links work correctly

### Expected Result

After successful re-mapping:
- Both `https://[canister-id].icp0.io/` and `https://campus-point-services.icp0.io/` serve identical content
- No "Error 400 - Canister ID Not Resolved" errors
- Custom domain loads the latest Draft Version 10 deployment
- All functionality (forms, navigation, etc.) works on both URLs

---

## Troubleshooting Custom Domain

**Problem:** `https://campus-point-services.icp0.io/` shows "Error 400 - Canister ID Not Resolved"

**Cause:** The domain is still mapped to the old (deleted) canister

**Solution:**
1. Complete the re-mapping steps above to point it to the new canister ID
2. Wait 2-5 minutes for DNS propagation
3. Clear browser cache and try again in incognito mode
4. If still not working, verify the re-mapping was applied correctly

**Problem:** Custom domain shows old/cached content

**Solution:**
1. Clear browser cache completely
2. Try in incognito/private browsing mode
3. Wait a few more minutes for CDN cache to clear
4. Verify the new `https://[canister-id].icp0.io/` URL works correctly first
5. Compare timestamps or content to confirm both URLs match

**Problem:** Re-mapping completed but still seeing errors

**Solution:**
1. Wait up to 10 minutes for full DNS/CDN propagation
2. Try from a different network or device
3. Use `curl -I https://campus-point-services.icp0.io/` to check HTTP headers
4. Verify the canister ID in the re-mapping matches the deployment output
5. Contact ICP0 support if issues persist after 15 minutes

---

## How to Use These URLs

### Primary URL (Direct Canister Access)
**`https://[canister-id].icp0.io/`**
- Direct access to the canister
- Always works immediately after deployment
- Use for Google Search Console verification
- Use for sitemap submission

### Custom Domain (Alias)
**`https://campus-point-services.icp0.io/`**
- User-friendly branded URL
- Requires re-mapping after each new deployment
- Better for marketing and sharing
- Easier to remember and communicate

### Sitemap URL
**`https://[canister-id].icp0.io/sitemap.xml`**
- Submit this to Google Search Console
- Also accessible via custom domain after re-mapping

---

## Important Notes

- Both URLs serve the **same live production deployment** (Draft Version 10)
- The `*.icp0.io` URL format is the standard Internet Computer deployment domain
- Always use `https://` when sharing or submitting to search engines
- Include the trailing slash `/` for consistency
- The runtime app automatically updates `og:url` metadata to match the deployed origin
- **Custom domains require re-mapping** after each deployment with a new canister ID
- Re-mapping typically takes 2-5 minutes but can take up to 15 minutes in some cases

---

## Update Instructions

After finding your actual canister ID from deployment logs:

1. **Replace `[canister-id]`** in this file with the actual canister ID
2. **Update** `frontend/DEPLOYMENT_OUTPUT.md` with the same canister ID
3. **Update** `frontend/GOOGLE_INDEXING_GUIDE.md` with the same canister ID
4. **Complete custom domain re-mapping** using the steps above
5. **Verify both URLs** work correctly using the verification checklist
6. **Test all functionality** on both the direct and custom domain URLs

---

## Finding Your Canister ID

If you need to find your canister ID:

1. Check the deployment output logs for "Frontend canister via browser"
2. Run `dfx canister id frontend` in your project directory
3. The canister ID is the subdomain before `.icp0.io` in the URL
4. Format: `xxxxx-xxxxx-xxxxx-xxxxx-xxx` (five groups separated by hyphens)
