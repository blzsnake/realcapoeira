import { Module } from '@tramvai/core';
import { DEFAULT_FOOTER_COMPONENT } from '@tramvai/tokens-render';
import { Footer } from './Footer';

@Module({
  providers: [
    {
      provide: DEFAULT_FOOTER_COMPONENT,
      useValue: Footer,
    },
  ],
})
export class FooterModule {}
