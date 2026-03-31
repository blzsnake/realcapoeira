export const HOME_CMS_QUERY = `
  query HomeCms {
    allNews(first: 10, orderBy: position_ASC) {
      id
      title
      shortTitle
      shortDescription
      descriptionUp
      publishedAt: _publishedAt
    }

    dataCommon {
      id
      trainingYears
      quantityFilials
      quantityTraineers
    }

    allCitiesLists(orderBy: position_ASC, filter: { showOnMain: { eq: true } }) {
      id
      cityId
      cityName
      country
      cityFriend
      showOnMain
      cityImage {
        url
        alt
      }
    }
  }
`;
