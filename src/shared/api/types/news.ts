export interface NewsRecord {
  id: string;
  title: string | null;
  shortTitle: string | null;
  shortDescription: string | null;
  descriptionUp: string | null;
  publishedAt: string;
}

export interface HomeNewsResponse {
  allNews: NewsRecord[];
}
