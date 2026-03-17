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
  }
`;
