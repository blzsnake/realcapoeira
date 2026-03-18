import {
  getCachedHomeCmsData,
  getFallbackHomeWorldwideCities,
  loadHomeCmsDataWithFallback,
  type HomeWorldwideCity,
} from './homeCms';

export const getCachedHomeWorldwideCities = () =>
  getCachedHomeCmsData()?.worldwideCities || null;

export const loadHomeWorldwideCitiesWithFallback = async (options?: {
  forceFresh?: boolean;
}) => {
  const homeCmsData = await loadHomeCmsDataWithFallback(options);

  return homeCmsData.worldwideCities;
};

export { getFallbackHomeWorldwideCities, type HomeWorldwideCity };
