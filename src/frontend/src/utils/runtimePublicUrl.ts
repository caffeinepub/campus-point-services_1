/**
 * Runtime utility to derive and apply the app's public URL from window.location.
 * Prefers the short alias domain for canonical and sharing metadata.
 */

const PREFERRED_ALIAS = 'https://campus-point-services.icp0.io/';

export function updateRuntimePublicUrl(): void {
  if (typeof window === 'undefined') return;

  // Determine the URL to use for metadata
  const currentOrigin = window.location.origin;
  const isAliasHost = currentOrigin.includes('campus-point-services.icp0.io');
  
  // Prefer the alias domain for metadata, but use current origin as fallback
  const metadataUrl = isAliasHost ? PREFERRED_ALIAS : `${currentOrigin}/`;

  // Update og:url meta tag
  const ogUrlMeta = document.querySelector('meta[property="og:url"]');
  if (ogUrlMeta) {
    ogUrlMeta.setAttribute('content', metadataUrl);
  }

  // Set or update canonical URL to prefer the short alias domain
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = PREFERRED_ALIAS;
}
