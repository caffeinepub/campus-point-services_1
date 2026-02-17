/**
 * Admin authorization utilities
 * 
 * Note: The hardcoded AUTHORIZED_ADMIN_EMAILS list is deprecated for authorization checks.
 * Authorization is now managed dynamically via the backend.
 * These utilities are kept only for email normalization helpers.
 */

/**
 * Normalize email for case-insensitive comparison
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * @deprecated Use backend-managed authorization instead
 * This constant is no longer used for authorization checks
 */
export const AUTHORIZED_ADMIN_EMAILS = [
  'advnitin1404@gmail.com',
  'gauravgodawat3399@gmail.com',
  'new_email@iitj.ac.in',
];

/**
 * @deprecated Use backend authorization check instead
 * Check if an email is in the authorized admin list (case-insensitive)
 */
export function isAuthorizedAdminEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  return AUTHORIZED_ADMIN_EMAILS.some(
    (authorizedEmail) => normalizeEmail(authorizedEmail) === normalized
  );
}
