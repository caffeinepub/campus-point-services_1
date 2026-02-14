/**
 * Runtime utility to derive and apply the app's public URL from window.location.
 * This ensures the deployed *.icp0.io origin is reflected in metadata for the current deployment.
 */

export function updateRuntimePublicUrl(): void {
  if (typeof window === 'undefined') return;

  // Derive the public URL from the current window location (equivalent to window.location.origin + '/')
  const publicUrl = `${window.location.origin}/`;

  // Update og:url meta tag
  const ogUrlMeta = document.querySelector('meta[property="og:url"]');
  if (ogUrlMeta) {
    ogUrlMeta.setAttribute('content', publicUrl);
  }
}
