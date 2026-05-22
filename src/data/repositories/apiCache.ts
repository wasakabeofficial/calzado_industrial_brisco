const DEFAULT_EXPIRATION = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cacheStore = new Map<string, CacheEntry<unknown>>();
const pendingRequests = new Map<string, Promise<unknown>>();

export function getFromCache<T>(cacheKey: string): T | undefined {
  const entry = cacheStore.get(cacheKey) as CacheEntry<T> | undefined;
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(cacheKey);
    return undefined;
  }
  return entry.data;
}

export function setInCache<T>(
  cacheKey: string,
  data: T,
  expiration?: number,
): void {
  cacheStore.set(cacheKey, {
    data,
    expiresAt: Date.now() + (expiration ?? DEFAULT_EXPIRATION),
  });
}

export function clearCache(cacheKey?: string): void {
  if (cacheKey) {
    cacheStore.delete(cacheKey);
    pendingRequests.delete(cacheKey);
  } else {
    cacheStore.clear();
    pendingRequests.clear();
  }
}

export async function executeWithCache<T>(
  cacheKey: string,
  fetchFunction: () => Promise<T>,
  expiration?: number,
): Promise<T> {
  const cached = getFromCache<T>(cacheKey);
  if (cached !== undefined) return cached;

  const existingRequest = pendingRequests.get(cacheKey) as Promise<T> | undefined;
  if (existingRequest) return existingRequest;

  const promise = fetchFunction()
    .then((result) => {
      setInCache(cacheKey, result, expiration);
      pendingRequests.delete(cacheKey);
      return result;
    })
    .catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, promise);
  return promise;
}
