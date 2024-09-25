import NodeCache from "node-cache";

export const articleCountByKeywordCache = new NodeCache({
  stdTTL: process.env.DEFAULT_CACHE_TTL || 1000,
});

export const globalCache = new NodeCache({
  stdTTL: process.env.DEFAULT_CACHE_TTL || 1000,
});
