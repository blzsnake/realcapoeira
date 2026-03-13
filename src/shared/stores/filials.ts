import { createEvent, createReducer } from '@tramvai/state';
import type { Filial } from '~shared/api/types/filial';

export const setFilials = createEvent<Filial[]>('setFilials');

export const FilialsStore = createReducer('filials', [] as Filial[]).on(
  setFilials,
  (_state, filials) => filials
);
