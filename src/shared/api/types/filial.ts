import type {
  CoachApiRecord,
  DatoCMSImage,
  DatoCMSStructuredText,
} from './coach';

export type FilialWeekday =
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun';

export type FilialGroupKey = 'junior' | 'middle' | 'senior' | 'staff';

export interface FilialLocation {
  latitude: number;
  longitude: number;
}

export interface DatoCMSColor {
  hex: string;
}

export interface FilialCityObject {
  cityKey: string | null;
  cityName: string | null;
}

export interface FilialLinkedCoach {
  id: string;
  slug: string;
  name: string;
  phone: string | null;
  level?: string | null;
  nick?: string | null;
  photo?: DatoCMSImage | null;
}

export interface FilialScheduleItem {
  id: string;
  weekday: FilialWeekday;
  groupKey: FilialGroupKey;
  groupLabel: string;
  timeFrom: string;
  timeTo: string;
}

export interface FilialPreparationItem {
  id: string;
  title: string;
  isOpenByDefault: boolean | null;
  content: DatoCMSStructuredText | null;
}

export interface Filial {
  id: string;
  title: string;
  slug: string;
  isActive: boolean;
  sortOrder: number | null;
  cityObject: FilialCityObject | null;
  metroName: string | null;
  metroColor: DatoCMSColor | null;
  street: string;
  location: FilialLocation | null;
  heroImage: DatoCMSImage | null;
  hallDescription: DatoCMSStructuredText | null;
  trialLessonPrice: number | null;
  singleLessonPrice: number | null;
  monthlyPrice: number | null;
  coaches: FilialLinkedCoach[];
  scheduleItems: FilialScheduleItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AllFilialsResponse {
  allFilials: Filial[];
}

export interface FilialBySlugResponse {
  filial: Filial | null;
}

export interface FilialsAndCoachesResponse {
  allFilials: Filial[];
  allCoaches: CoachApiRecord[];
}
