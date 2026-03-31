export interface DataCommonRecord {
  id: string;
  trainingYears: number | null;
  quantityFilials: number | null;
  quantityTraineers: number | null;
}

export interface HomeStatsResponse {
  dataCommon: DataCommonRecord | null;
}
