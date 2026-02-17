# Specification

## Summary
**Goal:** Allow the owner/enquiries admins to add/remove additional admins for the Enquiries page using a backend-managed, persistent email allowlist (no hardcoded lists).

**Planned changes:**
- Backend: Store an editable, persistent (upgrade-safe) list of authorized enquiry-admin emails initialized with the current default emails, and use it for all enquiries authorization checks.
- Backend: Add admin-management APIs to list/add/remove authorized admin emails with validation (non-empty), case-insensitive normalization, and duplicate prevention; reject unauthorized attempts with an appropriate trap.
- Frontend: Add an “Admin Access” panel on the Enquiries dashboard for authorized users to view the current admin email list, add a new email, and remove an email (with confirmation), including loading/disabled states and success/error toasts.
- Frontend: Update any “Access Denied” diagnostics (e.g., “Email Authorized: Yes/No”) to use the backend-managed admin list rather than a frontend hardcoded list.
- Frontend: Add concise guidance on the Enquiries login/access area explaining that a new admin must (1) be added to the authorized email list and (2) log in with Internet Identity and set their profile email to match the authorized email.

**User-visible outcome:** An existing enquiries admin can manage who has access by adding/removing admin emails directly in the Enquiries dashboard, and users see clear instructions on how a newly added admin can gain access.
