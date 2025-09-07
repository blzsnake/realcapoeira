import { createReducer } from '@tramvai/state';

export const ModalStore = createReducer({
  name: 'modals',
  initialState: {
    signUp: {
      isOpen: false,
    },
    contacts: {
      isOpen: false,
    },
    filter: {
      isOpen: false,
    },
  },
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
