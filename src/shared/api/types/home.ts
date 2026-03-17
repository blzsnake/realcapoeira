import type { DataCommonRecord } from './stats';
import type { NewsRecord } from './news';

export interface HomeCmsResponse {
  allNews: NewsRecord[];
  dataCommon: DataCommonRecord | null;
}
