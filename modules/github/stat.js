const _ = require('lodash');

function userEventsAvg(userEvents) {
  if (userEvents.length === 0)
    throw Error('userEvents array is empty');

  const eventCounts = _.countBy(userEvents, 'type');
  const eventWeights = {
    PushEvent: 4,
    PullRequestReviewCommentEvent: 3,
    ReleaseEvent: 2
  };

  const data = [];
  for (let eventType in eventCounts) {
    let weight = 1;
    if (eventWeights[eventType] != null)
      weight = eventWeights[eventType];
    data.push(weight * eventCounts[eventType]);
  }

  return _.sum(data) / userEvents.length;
}

module.exports = { userEventsAvg };
