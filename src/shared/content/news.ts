import {
  getCachedHomeCmsData,
  getFallbackHomeNewsSection,
  loadHomeCmsDataWithFallback,
  type HomeNewsItem,
  type HomeNewsSection,
} from './homeCms';

type LoadHomeNewsSectionOptions = {
  forceFresh?: boolean;
};

export type { HomeNewsItem, HomeNewsSection };

export { getFallbackHomeNewsSection };

export const getCachedHomeNewsSection = () =>
  getCachedHomeCmsData()?.newsSection || null;

export async function loadHomeNewsSectionWithFallback(
  options: LoadHomeNewsSectionOptions = {}
) {
  const homeCmsData = await loadHomeCmsDataWithFallback(options);

  return homeCmsData.newsSection;
}
