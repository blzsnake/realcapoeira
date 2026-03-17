/** Structured Text value from DatoCMS */
export interface DatoCMSStructuredText {
  value: unknown;
}

/** Image from DatoCMS media library */
export interface DatoCMSImage {
  url: string;
  alt: string | null;
}

export interface CoachCityObject {
  cityKey: string | null;
  cityName: string | null;
}

/** Coach record from DatoCMS */
export interface Coach {
  slug: string;
  name: string;
  nick: string;
  level: string;
  phone: string;
  quote: string;
  city: string;
  since: string;
  incapoeira: string;
  groups: string[];
  selfDescription: DatoCMSStructuredText | null;
  trainDescription: DatoCMSStructuredText | null;
  photo: DatoCMSImage | null;
  linkTg: string | null;
  linkInst: string | null;
  linkVk: string | null;
  linkWa: string | null;
  linkYoutube: string | null;
}

export interface CoachApiRecord extends Omit<Coach, 'city'> {
  city: CoachCityObject | null;
}

/** Helper: convert DatoCMS coach links to the format used by components */
export function getCoachLinks(coach: Coach) {
  const links: Record<string, string> = {};
  if (coach.linkTg) links.tg = coach.linkTg;
  if (coach.linkInst) links.inst = coach.linkInst;
  if (coach.linkVk) links.vk = coach.linkVk;
  if (coach.linkWa) links.wa = coach.linkWa;
  if (coach.linkYoutube) links.youtube = coach.linkYoutube;
  return links;
}

/** Response types for GraphQL queries */
export interface AllCoachesResponse {
  allCoaches: CoachApiRecord[];
}

export interface CoachBySlugResponse {
  coach: CoachApiRecord | null;
}
