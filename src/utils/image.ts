/**
 * Image optimization utilities.
 * Automatically injects Cloudinary format/quality/dimension parameters
 * for maximum compression (WebP/AVIF, q_auto).
 */

export function optimizeImageUrl(url: string | undefined | null, width?: number): string {
  if (!url) return "";

  // Cloudinary optimization
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    // Avoid double transformation if already present
    if (url.includes("/image/upload/f_auto") || url.includes("/image/upload/q_auto")) {
      return url;
    }
    const transform = width ? `f_auto,q_auto,w_${width},c_limit` : "f_auto,q_auto";
    return url.replace("/image/upload/", `/image/upload/${transform}/`);
  }

  return url;
}
