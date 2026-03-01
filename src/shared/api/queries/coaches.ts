export const ALL_COACHES_QUERY = `
  query AllCoaches {
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
      }
      linkTg
      linkInst
      linkVk
      linkWa
      linkYoutube
    }
  }
`;

export const COACH_BY_SLUG_QUERY = `
  query CoachBySlug($slug: String!) {
    coach(filter: { slug: { eq: $slug } }) {
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
      }
      linkTg
      linkInst
      linkVk
      linkWa
      linkYoutube
    }
  }
`;
