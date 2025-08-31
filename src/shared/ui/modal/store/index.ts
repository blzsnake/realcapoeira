import { createReducer } from '@tramvai/state';

export const ModalStore = createReducer({
  name: 'modals',
  initialState: {},
  events: {
    setModalState: (
      state,
      { type, isOpen }: { type: string; isOpen: boolean }
    ) => ({
      ...state,
      [type]: {
        isOpen,
      },
    }),
  },
});

export const { setModalState } = ModalStore.events;
