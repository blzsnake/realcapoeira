import {
  getCachedHomeCmsData,
  getFallbackHomeStats,
  loadHomeCmsDataWithFallback,
  type HomeStats,
} from './homeCms';

export type { HomeStats };

export { getFallbackHomeStats };

export const getCachedHomeStats = () => getCachedHomeCmsData()?.stats || null;

export async function loadHomeStatsWithFallback(options?: {
  forceFresh?: boolean;
}) {
  const homeCmsData = await loadHomeCmsDataWithFallback(options);

  return homeCmsData.stats;
}
