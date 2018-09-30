function weightedAvg(data, weights) {
  data = data || [];
  weights = weights || [];

  if (data.length === 0)
    throw Error('data array is empty or not an array')

  if (data.length !== weights.length)
    throw Error('data array and weights array are not the same length');

  let weightedSum = 0;
  for (let i = 0; i < data.length; i++) {
    weightedSum += weights[i] * data[i];
  }

  return weightedSum / data.length;
}

module.exports = weightedAvg;
