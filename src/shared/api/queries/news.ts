export const HOME_NEWS_QUERY = `
  query HomeNews {
    allNews(first: 10, orderBy: position_ASC) {
      id
      title
      shortTitle
      shortDescription
      descriptionUp
      publishedAt: _publishedAt
    }
  }
`;
