const { jStat } = require('jstat');


const variables = {
    rpm: {
        weight: 0.64,
        mu: 3000,
        sigma: 700,
    },
    throttle: {
        weight: 0.13,
        mu: 35,
        sigma: 20,
    },
    acceleration: {
        weight: 0.23,
        mu: 0,
        sigma: 4,
    }
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