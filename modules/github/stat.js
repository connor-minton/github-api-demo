const _ = require('lodash');
const config = require('config');

function userEventsAvg(userEvents) {
  if (userEvents.length === 0)
    throw Error('userEvents array is empty');

  const eventCounts = _.countBy(userEvents, 'type');
  const eventWeights = config.get('eventWeights');

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
