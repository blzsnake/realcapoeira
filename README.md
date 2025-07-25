# realcapoeira-front

realcapoeira-front tramvai application

## Install dependencies

Run installation with selected package manager `npm install`

## Usage

- `npm start` - run development server
- `npm build` - production build

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
