const TTL_MS = 5 * 60 * 1000; // 5 minutos

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttl?: number): void {
  store.set(key, { data, expiresAt: Date.now() + (ttl ?? TTL_MS) });
}

export function clearCache(key?: string): void {
  if (key) {
    store.delete(key);
    inflight.delete(key);
  } else {
    store.clear();
    inflight.clear();
  }
}

/**
 * Ejecuta `fn` y cachea el resultado. Si hay una solicitud en vuelo
 * para la misma key, reusa la promesa en lugar de hacer otra llamada.
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl?: number,
): Promise<T> {
  // 1. Revisar cache
  const cached = getCached<T>(key);
  if (cached !== undefined) return cached;

  // 2. Revisar si ya hay una petición en vuelo para esta key
  const inFlight = inflight.get(key) as Promise<T> | undefined;
  if (inFlight) return inFlight;

  // 3. Hacer la petición
  const promise = fn()
    .then((data) => {
      setCache(key, data, ttl);
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, promise);
  return promise;
}
