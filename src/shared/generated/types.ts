import type { Coach } from '~shared/api/types/coach';
import type { Filial } from '~shared/api/types/filial';

export interface GeneratedHomeNewsItem {
  id: string;
  shortTitle: string;
  title: string;
  shortDescription: string;
  description: string;
  publishedAt?: string;
}

export interface GeneratedHomeNewsSection {
  title: string;
  description: string;
  items: GeneratedHomeNewsItem[];
}

export interface GeneratedHomeStats {
  trainingYears: number;
  quantityFilials: number;
  quantityTraineers: number;
}

export interface GeneratedHomeWorldwideCity {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  cityFriend: boolean;
  imageUrl: string;
  imageAlt: string;
}

export interface CmsFallbackSnapshot {
  generatedAt: string;
  schemaVersion: number;
  home: {
    newsSection: GeneratedHomeNewsSection;
    stats: GeneratedHomeStats;
    worldwideCities: GeneratedHomeWorldwideCity[];
  };
  coaches: Coach[];
  filials: Filial[];
}
