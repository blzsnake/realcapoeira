import { createApp } from '@tramvai/core';
import { CommonModule } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { SeoModule } from '@tramvai/module-seo';
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
  LAYOUT_OPTIONS,
} from '@tramvai/tokens-render';
import { Layout } from '~shared/layout';
import './app/styles/index.css';
import { HeaderModule } from '~shared/header';
import { FooterModule } from '~shared/footer';
import { getFontsProviders } from './app/fonts/fonts';

createApp({
  name: 'realcapoeira-front',
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ useStrictMode: true }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [
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
      provide: LAYOUT_OPTIONS,
      useValue: {
        // React components
        components: {
          // global layout component
          layout: Layout,
        },
      },
    },
    ...getFontsProviders(),
  ],
});
