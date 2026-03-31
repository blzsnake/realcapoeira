# DatoCMS model for filials

## Current DatoCMS integration

The current DatoCMS integration for coaches is implemented here:

- `src/shared/api/datocms.ts` - GraphQL request helper
- `src/shared/api/queries/coaches.ts` - coach queries
- `src/shared/api/types/coach.ts` - coach types
- `src/shared/stores/coaches.ts` - coach store
- `src/routes/coaches/index.tsx` - coaches list page
- `src/routes/coaches/[id]/index.tsx` - coach detail page

Right now `filials` are still driven by mocks:

- `src/shared/mocks/index.ts`
- `src/shared/mocks/cities/*.ts`
- `src/routes/filials/index.tsx`
- `src/routes/filials/utils/filter.ts`

## Goal

Create a DatoCMS model that can be used for:

- filials list page `/filials/`
- future filial detail page `/filials/[slug]/`
- filter by city / group / coach
- map markers
- schedule
- prices
- "about hall" text and image
- preparation accordion

The model should fit the same integration style as `coach`: GraphQL query + typed response + store or page action.

## Recommended setup

For the first stage, keep the setup small:

1. `filial` - main record model
2. `filial_schedule_item` - block model for schedule rows
3. `filial_preparation_item` - block model for accordion items

I do not recommend creating a separate `city` model yet. It adds extra relations and extra queries, while the current frontend already works with a fixed set of city keys. For minimal programming, it is better to keep city data inside `filial`.

## Main model: `filial`

API key: `filial`

Recommended fields:

| Field label | API key | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| Name | `title` | single-line string | yes | Example: `Филиал на Войковской` |
| Slug | `slug` | slug | yes | Needed for future detail route `/filials/[slug]/` |
| Active | `isActive` | boolean | yes | Lets you hide a branch without deleting it |
| Sort order | `sortOrder` | integer | no | Useful for manual sorting on the list page |
| City key | `cityKey` | single-line string or select | yes | Must match current frontend values exactly: `moscow`, `korolev`, `mytishi`, `krasnogorsk`, `krasnodar`, `kazan`, `lissabon` |
| City name | `cityName` | single-line string | yes | Example: `Москва`, `Казань` |
| Metro name | `metroName` | single-line string | no | Optional, because not every city has metro |
| Metro color | `metroColor` | color or single-line string | no | Needed for the colored dot on cards |
| Street / address | `street` | single-line string | yes | Full street address line |
| Coordinates | `location` | geolocation field | yes | Prefer one geolocation field instead of separate lat/lng |
| Hero image | `heroImage` | asset | yes | Main image for filial detail page |
| Gallery | `gallery` | gallery / multiple assets | no | Optional reserve for later |
| Hall description | `hallDescription` | structured text | yes | Section "О зале" |
| Trial lesson price | `trialLessonPrice` | integer | no | Use `0` for free lesson |
| Single lesson price | `singleLessonPrice` | integer | no | Example: `1000` |
| Monthly price | `monthlyPrice` | integer | no | Example: `6000` |
| Coaches | `coaches` | links to many `coach` records | yes | Reuse existing coach model from DatoCMS |
| Schedule items | `scheduleItems` | modular content (many blocks) | yes | Use `filial_schedule_item` block |
| Preparation items | `preparationItems` | modular content (many blocks) | no | Use `filial_preparation_item` block |
| SEO title | `seoTitle` | single-line string | no | Optional if you do not use Dato SEO plugin |
| SEO description | `seoDescription` | text | no | Optional |

## Block model: `filial_schedule_item`

API key: `filial_schedule_item`

Recommended fields:

| Field label | API key | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| Weekday | `weekday` | single-line string or select | yes | Use exact values: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun` |
| Group key | `groupKey` | single-line string or select | yes | Use exact values: `junior`, `middle`, `senior`, `staff` |
| Group label | `groupLabel` | single-line string | yes | Example: `Дети 7-10 лет` |
| Time from | `timeFrom` | single-line string or time | yes | Example: `17:00` |
| Time to | `timeTo` | single-line string or time | yes | Example: `18:00` |
| Coach | `coach` | link to one `coach` record | no | Useful for detail page schedule and future filters |

Why this is better than storing a 7-item nested array:

- editors can add and edit rows one by one
- the frontend can group rows by `weekday`
- it works for both list cards and future detail page
- relation to `coach` gives access to `name`, `phone`, `slug` without duplication

## Block model: `filial_preparation_item`

API key: `filial_preparation_item`

Recommended fields:

| Field label | API key | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| Title | `title` | single-line string | yes | Example: `Если вы в первый раз` |
| Content | `content` | structured text | yes | Accordion body |
| Open by default | `isOpenByDefault` | boolean | no | Optional UI helper |

This block should power the "Подготовка к занятию" accordion.

## Why this structure

### 1. It is close to the current coach integration

The coaches setup is simple:

- one main record model
- GraphQL query
- typed response
- direct render in React

The same pattern works for filials.

### 2. It avoids duplication

Do not store coach names and phones as plain text inside `filial` if the coaches already exist in DatoCMS.

Use relation:

- list page can render coach phone/name from nested coach records
- detail page can render coach cards from the same relation
- coach -> filial navigation can later be implemented through slugs and relations, not duplicate ids

### 3. It supports the future filial detail page

The design requires fields that do not exist in mocks:

- main image
- hall description
- prices
- preparation accordion
- slug for detail page

So the filial model should be designed for the future detail page now, not only for the current map/list page.

## Important compatibility notes

### 1. `cityKey` must match current frontend filters

Current frontend city filter values are:

- `moscow`
- `korolev`
- `mytishi`
- `krasnogorsk`
- `krasnodar`
- `kazan`
- `lissabon`

If DatoCMS uses different values, filtering will break or require a mapper.

### 2. Coach relation should use coach `slug`, not old mock `id`

Current coaches pages already navigate by Dato slug:

- `/coaches/t_rogozin/`
- links to `/filials?coach=${slug}`

Current filial mocks still store legacy coach ids like `a.rogozin`.

For DatoCMS-based filials, the source of truth should be coach relation + coach slug.

### 3. Metro is optional

Some mocks have metro, some do not.

So:

- `metroName` should be optional
- `metroColor` should be optional
- UI should fall back to city name when metro is missing

## Mapping from current mocks to DatoCMS

Current mock shape:

```ts
{
  address: {
    city: 'г. Москва',
    metro: { name: 'Войковская', color: '#...' },
    street: 'ул. ...',
    lat: 55.0,
    lng: 37.0,
  },
  coaches: [
    { id: 'a.rogozin', name: '...', phone: '...' }
  ],
  schedule: [
    [ { group: '...', time: '17:00-18:00', id: 'middle' } ],
    [],
    ...
  ]
}
```

Suggested mapping:

- `address.city` -> `cityName`
- city object key from `FILIALS_MOCK` -> `cityKey`
- `address.metro.name` -> `metroName`
- `address.metro.color` -> `metroColor`
- `address.street` -> `street`
- `address.lat/lng` -> `location`
- `coaches[*].id` -> replace with relation to `coach`
- `schedule[weekdayIndex][*]` -> `scheduleItems[]`
- new detail-page content (`heroImage`, `hallDescription`, `prices`, `preparationItems`) -> fill manually in DatoCMS

## Minimum GraphQL shape for future implementation

List page:

```graphql
query AllFilials {
  allFilials(orderBy: sortOrder_ASC, filter: { isActive: { eq: true } }) {
    slug
    title
    cityKey
    cityName
    metroName
    metroColor
    street
    location {
      latitude
      longitude
    }
    coaches {
      slug
      name
      phone
    }
    scheduleItems {
      ... on FilialScheduleItemRecord {
        weekday
        groupKey
        groupLabel
        timeFrom
        timeTo
        coach {
          slug
          name
          phone
        }
      }
    }
  }
}
```

Detail page:

```graphql
query FilialBySlug($slug: String!) {
  filial(filter: { slug: { eq: $slug } }) {
    slug
    title
    cityKey
    cityName
    metroName
    metroColor
    street
    location {
      latitude
      longitude
    }
    heroImage {
      url
      alt
    }
    hallDescription {
      value
    }
    trialLessonPrice
    singleLessonPrice
    monthlyPrice
    coaches {
      slug
      name
      nick
      level
      phone
      groups
      photo {
        url
        alt
      }
    }
    scheduleItems {
      ... on FilialScheduleItemRecord {
        weekday
        groupKey
        groupLabel
        timeFrom
        timeTo
        coach {
          slug
          name
          phone
        }
      }
    }
    preparationItems {
      ... on FilialPreparationItemRecord {
        title
        isOpenByDefault
        content {
          value
        }
      }
    }
    seoTitle
    seoDescription
  }
}
```

## Recommended required fields for content team

If you want the admin model to stay simple, make these fields required:

- `title`
- `slug`
- `isActive`
- `cityKey`
- `cityName`
- `street`
- `location`
- `heroImage`
- `hallDescription`
- `coaches`
- `scheduleItems`

Everything else can stay optional on phase 1.

## Practical conclusion

The best first version is:

- one main `filial` model
- relation to existing `coach` records
- schedule stored as repeatable schedule blocks
- preparation accordion stored as repeatable content blocks
- prices stored as dedicated numeric fields
- city stored inside `filial`, not as a separate model

This gives the lowest implementation cost and is enough for both:

- replacing current filial mocks
- building the future filial detail page from the same DatoCMS source
