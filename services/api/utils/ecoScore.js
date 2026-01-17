const variables = {
  rpm: {
    weight: 0.22,
    mu: 2200,
    sigma: 1000,
  },
  speed: {
    weight: 0.13,
    mu: 80, // km/h
    sigma: 40,
  },
  throttlePosition: {
    weight: 0.22,
    mu: 30, // %
    sigma: 30,
  },
  coolantTemp: {
    weight: 0.04,
    mu: 90, // Celsius
    sigma: 30,
  },
  fuelRate: {
    weight: 0.17,
    mu: 3, // L/h - ideal low consumption rate
    sigma: 6,
  },
  engineExhaustFlow: {
    weight: 0.09,
    mu: 150, // g/s
    sigma: 100,
  },
  acceleration: {
    weight: 0.13,
    mu: 0, // m/s^2
    sigma: 5,
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
 * Helper function to calculate the Cumulative Distribution Function (CDF)
 * for a standard normal distribution (mean=0, stdDev=1).
 * Uses the Abramowitz & Stegun approximation.
 */
function _normalCdf(x) {
    if (x < 0) {
        return 1 - _normalCdf(-x);
    }
    const b1 = 0.319381530;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c2 = 0.39894228;

    const t = 1.0 / (1.0 + p * x);
    const b = c2 * Math.exp(-x * x / 2.0);
    const n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    return 1.0 - b * n;
}

/**
 * p-value è lo score
*/


/**
 * Calcola il p-value per un test Z bilaterale (a due code).
 */
function twoTailedZTestPValue(sampleMean, populationMean, standardError) {
  if (standardError === 0) return 0;
  const zScore = (sampleMean - populationMean) / standardError;
  const pValue = 2 * (1 - _normalCdf(Math.abs(zScore)));
  return pValue;
}

/**
 * Calcola il p-value per un test Z unilaterale (coda destra). 
 */
function rightTailedZTestPValue(sampleMean, populationMean, standardError) {
  if (standardError === 0) return 0;
  const zScore = (sampleMean - populationMean) / standardError;
  const pValue = 1 - _normalCdf(zScore);
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

/**
 * Adjusts the weights of available vitals to ensure their sum is 1.
 * Returns a new variables object with adjusted weights.
 * @param {string[]} availableKeys - List of keys present in the data
 */
function getAdjustedVariables(availableKeys) {
    const adjustedVariables = JSON.parse(JSON.stringify(variables));
    let missingWeight = 0;
    let missingCount = 0;
    const totalVars = Object.keys(variables).length;

    // Calculate missing weight and count
    for (const key in variables || key == 'odometer' || key == 'fuelTankLevel') {
        if (!availableKeys.includes(key)) {
            missingWeight += variables[key].weight;
            missingCount++;
        }
    }

    if (missingCount > 0 && missingCount < totalVars) {
        const distrW = missingWeight / (totalVars - missingCount);
        for (const key in adjustedVariables) {
            if (availableKeys.includes(key) && key == 'odometer' && key == 'fuelTankLevel') {
                adjustedVariables[key].weight += distrW;
            }
        }
    }
    
    return adjustedVariables;
}

module.exports = {
    getWeightedScore,
    getInstantScore,
    twoTailedZTestPValue,
    rightTailedZTestPValue,
    getAdjustedVariables,
    variables
};