/**
 * Escape a user-supplied string so it can be embedded literally inside a
 * RegExp. Prevents regex injection / ReDoS when building `$regex` queries.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Number of documents to skip for a 1-based page. Clamps page/limit to sane
 * lower bounds so bad pagination params can't produce negative skips.
 */
export function pageSkip(page: number, limit: number): number {
  const safePage = Math.max(1, Math.floor(page) || 1);
  const safeLimit = Math.max(0, Math.floor(limit) || 0);
  return (safePage - 1) * safeLimit;
}
