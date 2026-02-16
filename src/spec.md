# Specification

## Summary
**Goal:** Restore admin access to the enquiries dashboard for the authorized admin email (Advnitin1404@gmail.com) and make the UI self-diagnose common profile/authorization issues.

**Planned changes:**
- Backend: Make authorized-admin email comparison case-insensitive and whitespace-tolerant by trimming + lowercasing both the stored profile email and the authorized email before comparison, so admin methods don’t incorrectly return Unauthorized.
- Frontend: On the enquiries dashboard, if the caller is authenticated but their user profile is missing or has an empty/whitespace email, show a “Complete Profile” form (name + email) that saves via `saveCallerUserProfile`, then re-checks authorization and loads enquiries when permitted.
- Frontend: Improve the “Access Denied” state to show whether `isCallerAdmin` is true/false and show the current saved profile email value (or “not set”), in English.
- Frontend: Add a React Query mutation hook for `saveCallerUserProfile` and use it from the enquiries dashboard profile form; on success, invalidate/refetch relevant queries (profile, admin check, enquiries) so the page updates without a hard refresh.

**User-visible outcome:** The authorized admin can access and manage enquiries even if their saved email differs by case/whitespace, and users who see “Access Denied” can understand whether it’s due to admin status or a missing/incorrect profile email and fix it directly from the page.
