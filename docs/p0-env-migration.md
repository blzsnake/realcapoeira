# P0 Environment Migration

This project uses SSG and still performs published-content runtime requests from the browser.

That means we need two different DatoCMS tokens:

- `DATOCMS_PUBLIC_TOKEN`: safe for published read-only browser requests
- `DATOCMS_API_TOKEN`: build-only token for snapshot refresh and static route generation

## Target state

### Local development

- `npm start` should work without secrets by falling back to generated snapshot content
- live published CMS updates require `DATOCMS_PUBLIC_TOKEN`
- local snapshot refresh and static route generation require `DATOCMS_API_TOKEN`

Use one of these gitignored files:

- `.env.local.js`
- `env.development.local.js`

Recommended local values:

```js
module.exports = {
  DATOCMS_PUBLIC_TOKEN: '',
  DATOCMS_API_TOKEN: '',
  YMAPS_API_KEY: '',
  SIGNUP_FORM_URL: '',
};
```

### Vercel Preview (`develop`)

Configure these environment variables in Vercel Project Settings:

- `DATOCMS_PUBLIC_TOKEN`
- `YMAPS_API_KEY`
- `SIGNUP_FORM_URL`

Add this only if the preview build runs snapshot refresh or route generation:

- `DATOCMS_API_TOKEN`

Because the site is statically built, `DATOCMS_PUBLIC_TOKEN` must be available during the Vercel build so it can be embedded into the client bundle.

### GitHub Actions production build

Production static builds need both tokens:

- `DATOCMS_PUBLIC_TOKEN`
- `DATOCMS_API_TOKEN`

Current production deploy workflow:

- build step: [`.github/workflows/deploy.yml`](/Users/alexluffy/work/realcapoeira/.github/workflows/deploy.yml)

`DATOCMS_API_TOKEN` is already wired there.
`DATOCMS_PUBLIC_TOKEN` must be added to the same build step before token rotation.

Suggested build step env:

```yml
env:
  DATOCMS_API_TOKEN: ${{ secrets.DATOCMS_API_TOKEN }}
  DATOCMS_PUBLIC_TOKEN: ${{ secrets.DATOCMS_PUBLIC_TOKEN }}
```

## Safe migration order

1. Add `DATOCMS_PUBLIC_TOKEN`, `YMAPS_API_KEY`, and `SIGNUP_FORM_URL` in Vercel Preview.
2. If preview build uses static route generation, also add `DATOCMS_API_TOKEN` in Vercel Preview.
3. Add `DATOCMS_PUBLIC_TOKEN` to the production GitHub Actions build step.
4. Verify:
   - local `npm start`
   - Vercel preview deployment from `develop`
   - production static build in GitHub Actions
5. Rotate the previously committed DatoCMS token.
6. Update local gitignored override files with the new token values.

## Expected behavior after migration

- Existing pages keep getting published content updates without a rebuild
- New dynamic slugs still require a rebuild, because SSG route generation happens at build time
- Local development still works even when DatoCMS env vars are not present
