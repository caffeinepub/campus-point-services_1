/**
 * Admin authorization constants
 */

// The single authorized admin email that can access the enquiries dashboard
export const AUTHORIZED_ADMIN_EMAIL = 'Advnitin1404@gmail.com';

/**
 * Normalize email for case-insensitive comparison
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Check if an email matches the authorized admin email (case-insensitive)
 */
export function isAuthorizedAdminEmail(email: string): boolean {
  return normalizeEmail(email) === normalizeEmail(AUTHORIZED_ADMIN_EMAIL);
}
