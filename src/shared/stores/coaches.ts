import { createReducer, createEvent } from '@tramvai/state';
import type { Coach } from '~shared/api/types/coach';

export const setCoaches = createEvent<Coach[]>('setCoaches');

export const CoachesStore = createReducer('coaches', [] as Coach[]).on(
  setCoaches,
  (_state, coaches) => coaches
);
