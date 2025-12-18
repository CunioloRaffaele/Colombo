const { jStat } = require('jstat');


const variables = {
  rpm: {
    weight: 0.22,
    mu: 2200,
    sigma: 500,
  },
  speed: {
    weight: 0.13,
    mu: 80, // km/h
    sigma: 20,
  },
  throttlePosition: {
    weight: 0.22,
    mu: 30, // %
    sigma: 15,
  },
  coolantTemp: {
    weight: 0.04,
    mu: 90, // Celsius
    sigma: 10,
  },
  fuelRate: {
    weight: 0.17,
    mu: 3, // L/h - ideal low consumption rate
    sigma: 2,
  },
  engineExhaustFlow: {
    weight: 0.09,
    mu: 150, // g/s
    sigma: 50,
  },
  acceleration: {
    weight: 0.13,
    mu: 0, // m/s^2
    sigma: 2,
  },
  // Vitals not directly related to driving style have a weight of 0.
  odometer: {
    weight: 0.0,
    mu: 0,
    sigma: 1,
  },
  fuelTankLevel: {
    weight: 0.0,
    mu: 0,
    sigma: 1,
  },
  };

/**
 * p-value è lo score
*/


/**
 * Calcola il p-value per un test Z bilaterale (a due code).
 */
function twoTailedZTestPValue(sampleMean, populationMean, standardError) {
  const zScore = (sampleMean - populationMean) / standardError;
  const pValue = 2 * (1 - jStat.normal.cdf(Math.abs(zScore), 0, 1));
  return pValue;
}

/**
 * Calcola il p-value per un test Z unilaterale (coda destra). 
 */
function rightTailedZTestPValue(sampleMean, populationMean, standardError) {
  const zScore = (sampleMean - populationMean) / standardError;
  const pValue = 1 - jStat.normal.cdf(zScore, 0, 1);
  return pValue;
}


function getWeightedScore(pValue, weight){
    return pValue * weight;
}

function getInstantScore(weightedScores){
    let sum = 0;
    for (let i = 0; i < weightedScores.length; i++) {
        sum += weightedScores[i];
    }
    return sum;
}

module.exports = {
    getWeightedScore,
    getInstantScore,
    twoTailedZTestPValue,
    rightTailedZTestPValue,
    variables
};