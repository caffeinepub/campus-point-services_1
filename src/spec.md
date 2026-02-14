# Specification

## Summary
**Goal:** Re-deploy the app to the Internet Computer to restore a working public URL, and update repository documentation to reference the new canister URL and explain how to re-attach the custom ICP0 domain.

**Planned changes:**
- Perform a fresh IC deployment that produces a new working `https://[canister-id].icp0.io/` URL and record the actual URL and deployment date in `frontend/DEPLOYMENT_OUTPUT.md`.
- Update `frontend/DEPLOYED_PUBLIC_URL.md` to set the new canister URL as **Current Deployment**, keep `https://campus-point-services.icp0.io/` labeled as previous/deprecated, and update the referenced sitemap URL to the new deployment.
- Update `frontend/GOOGLE_INDEXING_GUIDE.md` so the “Your Live Website URL” and sitemap URL point to the new working canister deployment.
- Add documentation describing how to re-map/reattach `campus-point-services.icp0.io` to the newly deployed canister ID, including a short verification checklist and guidance if the domain still resolves to a deleted/non-existing canister.

**User-visible outcome:** Users can open the newly deployed `https://[canister-id].icp0.io/` URL in a private/incognito window and see the app load successfully, and the repo docs reflect the new URL/sitemap and how to reattach the custom `campus-point-services.icp0.io` domain.
