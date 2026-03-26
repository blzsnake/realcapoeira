# realcapoeira-front

realcapoeira-front tramvai application

## Install dependencies

Run installation with selected package manager `npm install`

## Usage

- `npm start` - run development server
- `npm build` - production build

## Environment

- `.env.js` and `env.development.js` are safe tracked configs
- `.env.local.js` and `env.development.local.js` are local overrides and should stay untracked
- `DATOCMS_PUBLIC_TOKEN` is used for published runtime requests from the browser
- `DATOCMS_API_TOKEN` is used only for build-time snapshot refresh and static route generation
- `YMAPS_API_KEY` and `SIGNUP_FORM_URL` are public runtime configs

### Deployment checklist

- Local development:
  Use `.env.local.js` or `env.development.local.js`
- Vercel Preview (`develop`):
  Set `DATOCMS_PUBLIC_TOKEN`, `YMAPS_API_KEY`, `SIGNUP_FORM_URL`
- Vercel Preview build-time:
  Also set `DATOCMS_API_TOKEN` if preview builds must refresh snapshot or generate static dynamic routes
- GitHub Actions production build:
  Set both `DATOCMS_PUBLIC_TOKEN` and `DATOCMS_API_TOKEN`
- Token rotation:
  After all environments are configured, rotate the old DatoCMS token because it was previously committed

Full migration notes: [`docs/p0-env-migration.md`](./docs/p0-env-migration.md)

## Project structure

* `src` - application source code
  * `index.ts` - application entry point, where all tramvai modules are connected
  * `postcss.js` - postcss configuration object
  * `routes` - application pages
  * `shared` - reused modules of the application

We recommend follow [feature-sliced methodology](https://feature-sliced.design/) guidlines to structure application code.

## Important modules

* `@tramvai/module-server` - processing client requests, working with papi. [Documentation](https://tramvai.dev/docs/references/modules/server)
* `@tramvai/module-render` - server-side html rendering and client-side hydration. [Documentation](https://tramvai.dev/docs/references/modules/render)
* `@tramvai/module-router` - router integration in the application. [Documentation](https://tramvai.dev/docs/references/modules/router)

## Next steps

- [tramvai documentation](https://tramvai.dev/docs/get-started/overview)
- [tramvai cli documentation](https://tramvai.dev/docs/references/cli/base)
- [Tutorial](https://tramvai.dev/docs/tutorials/pokedex-app/new-app)
