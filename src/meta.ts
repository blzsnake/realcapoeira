import {
  RENDER_SLOTS,
  ResourceSlot,
  ResourceType,
} from '@tramvai/module-render';
import { META_DEFAULT_TOKEN } from '@tramvai/module-seo';
import type { PageResource } from '@tramvai/tokens-render';

type GetMetaProvidersProps = {
  favicon: {
    default: Record<number, string>;
    apple: Record<number, string>;
  };
  tags: Record<string, string>;
};

const createIconSlot = (size: string, src: string, isApple?: boolean) => ({
  type: ResourceType.iconLink,
  slot: ResourceSlot.HEAD_ICONS,
  payload: src,
  attrs: {
    rel: isApple ? 'apple-touch-icon' : 'icon',
    sizes: `${size}x${size}`,
  },
});

export const getMetaProviders = ({ favicon, tags }: GetMetaProvidersProps) => {
  const slots: PageResource[] = [];
  Object.entries(favicon.default).forEach(([size, src]) => {
    slots.push(createIconSlot(size, src));
  });
  Object.entries(favicon.apple).forEach(([size, src]) => {
    slots.push(createIconSlot(size, src, true));
  });

  return [
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
    },
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: slots,
    },
    {
      provide: META_DEFAULT_TOKEN,
      useValue: tags,
    },
  ];
};
