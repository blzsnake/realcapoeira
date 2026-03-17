import type { Coach } from '~shared/api/types/coach';
import type { Filial } from '~shared/api/types/filial';
import type { TypeOption } from '~shared/types/filials';
import {
  buildFallbackCoaches,
  normalizeCoachSlug,
  sortCoachesForList,
} from '~shared/content/coaches';
import {
  buildFallbackFilialsData,
  getCoachDefaultFilialValueFromSource,
  getFallbackFilials,
  getSignUpFilialOptionsFromSource,
  type FilialDetailData,
  type FilialsSource,
} from '~shared/content/filials';
import {
  getFallbackHomeCmsData,
  type HomeCmsData,
} from '~shared/content/homeCms';
import cmsFallback from './cms-fallback.json';
import type { CmsFallbackSnapshot } from './types';

const CMS_FALLBACK = cmsFallback as CmsFallbackSnapshot;

type RoutePayloadKind =
  | 'home'
  | 'coaches-list'
  | 'coach-page'
  | 'filials-list'
  | 'filial-page';

export type RoutePayload<T> = {
  kind: RoutePayloadKind;
  slug?: string;
  version: string;
  data: T;
};

export type HomePageData = {
  homeCms: HomeCmsData;
  filialsSource: FilialsSource;
  signUpFilialOptions: TypeOption[];
};

export type CoachesListPageData = {
  coaches: Coach[];
};

export type CoachPageData = {
  coach: Coach | null;
  filialsSource: FilialsSource;
  defaultFilialValue?: string;
};

export type FilialsListPageData = {
  filialsSource: FilialsSource;
  signUpFilialOptions: TypeOption[];
};

export type FilialPageData = {
  filial: FilialDetailData | null;
  coaches: Coach[];
};

const buildVersion = (...parts: string[]) =>
  [CMS_FALLBACK.generatedAt, ...parts.filter(Boolean)].join(':');

let snapshotCoachesCache: Coach[] | null = null;
let snapshotFilialsCache: Filial[] | null = null;
let snapshotFilialsSourceCache: FilialsSource | null = null;
let snapshotFilialDetailsCache: Record<string, FilialDetailData> | null = null;

export const getSnapshotCoaches = () => {
  if (snapshotCoachesCache) {
    return snapshotCoachesCache;
  }

  snapshotCoachesCache = buildFallbackCoaches(CMS_FALLBACK.coaches);

  return snapshotCoachesCache;
};

export const getSnapshotFilials = () => {
  if (snapshotFilialsCache) {
    return snapshotFilialsCache;
  }

  snapshotFilialsCache = getFallbackFilials();

  return snapshotFilialsCache;
};

export const getSnapshotFilialsSource = () => {
  if (snapshotFilialsSourceCache) {
    return snapshotFilialsSourceCache;
  }

  snapshotFilialsSourceCache =
    buildFallbackFilialsData(getSnapshotFilials()).source;

  return snapshotFilialsSourceCache;
};

export const getSnapshotFilialDetails = () => {
  if (snapshotFilialDetailsCache) {
    return snapshotFilialDetailsCache;
  }

  snapshotFilialDetailsCache =
    buildFallbackFilialsData(getSnapshotFilials()).details;

  return snapshotFilialDetailsCache;
};

export const getHomePagePayload = (): RoutePayload<HomePageData> => {
  const filialsSource = getSnapshotFilialsSource();

  return {
    kind: 'home',
    version: buildVersion('home'),
    data: {
      homeCms: getFallbackHomeCmsData(),
      filialsSource,
      signUpFilialOptions: getSignUpFilialOptionsFromSource(filialsSource),
    },
  };
};

export const getCoachesListPagePayload =
  (): RoutePayload<CoachesListPageData> => ({
    kind: 'coaches-list',
    version: buildVersion('coaches-list'),
    data: {
      coaches: sortCoachesForList(getSnapshotCoaches()),
    },
  });

export const getCoachPagePayload = (
  slug: string
): RoutePayload<CoachPageData> => {
  const filialsSource = getSnapshotFilialsSource();
  const coach = getSnapshotCoaches().find(
    (item) => normalizeCoachSlug(item.slug) === normalizeCoachSlug(slug)
  );

  return {
    kind: 'coach-page',
    slug,
    version: buildVersion('coach-page', slug),
    data: {
      coach: coach || null,
      filialsSource,
      defaultFilialValue: coach
        ? getCoachDefaultFilialValueFromSource(filialsSource, coach.slug)
        : undefined,
    },
  };
};

export const getFilialsListPagePayload =
  (): RoutePayload<FilialsListPageData> => {
    const filialsSource = getSnapshotFilialsSource();

    return {
      kind: 'filials-list',
      version: buildVersion('filials-list'),
      data: {
        filialsSource,
        signUpFilialOptions: getSignUpFilialOptionsFromSource(filialsSource),
      },
    };
  };

export const getFilialPagePayload = (
  slug: string
): RoutePayload<FilialPageData> => ({
  kind: 'filial-page',
  slug,
  version: buildVersion('filial-page', slug),
  data: {
    filial: getSnapshotFilialDetails()[slug] || null,
    coaches: getSnapshotCoaches(),
  },
});
