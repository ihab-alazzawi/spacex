const generateFilter = filter => {
  const { reused, with_reddit, land_success } = filter;
  const reusedFilters = [
    {
      $match: {
        $or: [
          { "rocket.first_stage.cores.0.reused": { $eq: true } },
          { "rocket.second_stage.payloads.0.reused": { $eq: true } }
        ]
      }
    }
  ];

  const withRedditFilters = [
    {
      $match: {
        $or: [
          { "links.reddit_campaign": { $ne: null } },
          { "links.reddit_launch": { $ne: null } },
          { "links.reddit_recovery": { $ne: null } },
          { "links.reddit_media": { $ne: null } }
        ]
      }
    }
  ];

  const landSuccessFilter = [
    {
      $match: {
        "rocket.first_stage.cores.0.land_success": {
          $eq: true
        }
      }
    }
  ];

  let filterQuery = [];

  if (filter) {
    if (
      reused === "false" &&
      land_success === "false" &&
      with_reddit === "false"
    ) {
      return filterQuery;
    }
    if (reused === "true") {
      filterQuery.push(...reusedFilters);
    }
    if (with_reddit === "true") {
      filterQuery.push(...withRedditFilters);
    }
    if (land_success === "true") {
      filterQuery.push(...landSuccessFilter);
    }
  }

  return filterQuery;
};

module.exports = generateFilter;
