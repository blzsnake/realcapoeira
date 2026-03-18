import type { DataCommonRecord } from './stats';
import type { NewsRecord } from './news';

export interface HomeCityImageRecord {
  url: string;
  alt: string | null;
}

export interface HomeCityRecord {
  id: string;
  cityId: string | null;
  cityName: string | null;
  country: string | null;
  cityFriend: boolean | null;
  showOnMain: boolean | null;
  cityImage: HomeCityImageRecord | null;
}

export interface HomeCmsResponse {
  allNews: NewsRecord[];
  dataCommon: DataCommonRecord | null;
  allCitiesLists: HomeCityRecord[];
}
