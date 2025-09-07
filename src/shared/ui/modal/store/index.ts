import { createReducer } from '@tramvai/state';

export const ModalStore = createReducer({
  name: 'modals',
  initialState: {
    signUp: {
      isOpen: false,
      address: null,
    },
    contacts: {
      isOpen: false,
    },
    filter: {
      isOpen: false,
    },
    formResult: {
      isOpen: false,
    },
  },
  events: {
    setModalState: (
      state,
      {
        type,
        isOpen,
        address,
      }: { type: string; isOpen: boolean; address?: string }
    ) => ({
      ...state,
      [type]: {
        isOpen,
        address,
      },
    }),
  },
});

export const { setModalState } = ModalStore.events;
