import {
  RENDER_SLOTS,
  ResourceSlot,
  ResourceType,
} from '@tramvai/module-render';

import font from './TT_Hoves_Pro_Regular.woff2';
import fontMedium from './TT_Hoves_Pro_Medium.woff2';
import fontDemiBold from './TT_Hoves_Pro_DemiBold.woff2';

export const getFontsProviders = () => {
  return [
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.preloadLink,
        slot: ResourceSlot.HEAD_CORE_SCRIPTS,
        payload: font,
        attrs: {
          as: 'font',
          type: 'font/woff2',
          crossOrigin: 'anonymous',
        },
      },
    },
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.preloadLink,
        slot: ResourceSlot.HEAD_CORE_SCRIPTS,
        payload: fontMedium,
        attrs: {
          as: 'font',
          type: 'font/woff2',
          crossOrigin: 'anonymous',
        },
      },
    },
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.preloadLink,
        slot: ResourceSlot.HEAD_CORE_SCRIPTS,
        payload: fontDemiBold,
        attrs: {
          as: 'font',
          type: 'font/woff2',
          crossOrigin: 'anonymous',
        },
      },
    },
  ];
};
