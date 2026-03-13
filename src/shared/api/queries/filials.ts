export const FILIAL_FIELDS = `
  id
  title
  slug
  isActive: isactive
  sortOrder
  cityKey: cityId
  cityName
  metroName
  metroColor {
    hex
  }
  street: address
  location: coordinates {
    latitude
    longitude
  }
  heroImage {
    url
    alt
    width
    height
  }
  hallDescription {
    value
  }
  trialLessonPrice: firstLesson
  singleLessonPrice: singleLesson
  monthlyPrice
  coaches: coachesList {
    id
    slug
    name
    phone
    level
    nick
    photo {
      url
      alt
      width
      height
    }
  }
  scheduleItems {
    ... on FilialScheduleItemRecord {
      id
      weekday
      groupKey
      groupLabel
      timeFrom
      timeTo
    }
  }
  createdAt: _createdAt
  updatedAt: _updatedAt
`;

export const ALL_FILIALS_QUERY = `
  query AllFilials {
    allFilials(orderBy: sortOrder_ASC, filter: { isactive: { eq: true } }) {
      ${FILIAL_FIELDS}
    }
  }
`;

export const FILIAL_BY_SLUG_QUERY = `
  query FilialBySlug($slug: String!) {
    filial(filter: { slug: { eq: $slug } }) {
      ${FILIAL_FIELDS}
    }
  }
`;

export const FILIALS_AND_COACHES_QUERY = `
  query FilialsAndCoaches {
    allFilials(orderBy: sortOrder_ASC, filter: { isactive: { eq: true } }) {
      ${FILIAL_FIELDS}
    }

    allCoaches(orderBy: name_ASC) {
      slug
      name
      nick
      level
      phone
      quote
      city
      since
      incapoeira
      groups
      selfDescription {
        value
      }
      trainDescription {
        value
      }
      photo {
        url
        alt
        width
        height
      }
      linkTg
      linkInst
      linkVk
      linkWa
      linkYoutube
    }
  }
`;
