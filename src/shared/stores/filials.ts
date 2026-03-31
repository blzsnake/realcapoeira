import { createEvent, createReducer } from '@tramvai/state';
import type { FilialsSource } from '~shared/content/filials';

export const setFilialsSource = createEvent<FilialsSource>('setFilialsSource');

export const FilialsStore = createReducer('filials', {} as FilialsSource).on(
  setFilialsSource,
  (_state, filialsSource) => filialsSource
);
