# Specification

## Summary
**Goal:** Generate a fresh working Internet Computer `*.icp0.io` canister public URL for the app and update deployment/indexing documentation and runtime Open Graph URL metadata to reference it.

**Planned changes:**
- Create a new IC deployment that results in a reachable `https://[canister-id].icp0.io/` URL and record it as the latest deployment URL in `frontend/DEPLOYMENT_OUTPUT.md`.
- Update `frontend/DEPLOYED_PUBLIC_URL.md` to replace the placeholder with the new live URL, keep `https://campus-point-services.icp0.io/` documented as deprecated, and update any sitemap examples to use the new URL.
- Update `frontend/GOOGLE_INDEXING_GUIDE.md` so the “Your Live Website URL” and sitemap references use the new deployed `*.icp0.io` URL.
- Ensure `og:url` is set to the runtime deployed origin by invoking `updateRuntimePublicUrl()` on app startup (without modifying `frontend/src/main.tsx`) and remove production debug logging from `frontend/src/utils/runtimePublicUrl.ts`.

**User-visible outcome:** The app is accessible via a newly generated, working `https://[canister-id].icp0.io/` URL, and the repo documentation and `og:url` metadata reflect the current live deployment (with the prior vanity URL documented as deprecated).
