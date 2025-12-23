import 'dart:math';

/// A service class for calculating eco-driving scores.
class EcoscoreService {
  /// Defines the statistical properties and weights for various vehicle vitals.
  ///
  /// Each vital has:
  /// - `weight`: Its importance in the overall eco-score calculation.
  /// - `mu`: The population mean (ideal value for eco-driving).
  /// - `sigma`: The population standard deviation.
  static final Map<String, VitalStats> variables = {
    'rpm': const VitalStats(weight: 0.22, mu: 2200, sigma: 500),
    'speed': const VitalStats(
      weight: 0.13,
      mu: 80, // km/h
      sigma: 20,
    ),
    'throttlePosition': const VitalStats(
      weight: 0.22,
      mu: 30, // %
      sigma: 15,
    ),
    'coolantTemp': const VitalStats(
      weight: 0.04,
      mu: 90, // Celsius
      sigma: 10,
    ),
    'fuelRate': const VitalStats(
      weight: 0.17,
      mu: 3, // L/h - ideal low consumption rate
      sigma: 2,
    ),
    'engineExhaustFlow': const VitalStats(
      weight: 0.09,
      mu: 150, // g/s
      sigma: 50,
    ),
    'acceleration': const VitalStats(
      weight: 0.13,
      mu: 0, // m/s^2
      sigma: 2,
    ),
    // Vitals not directly related to driving style have a weight of 0.
    'odometer': const VitalStats(weight: 0.0, mu: 0, sigma: 1),
    'fuelTankLevel': const VitalStats(weight: 0.0, mu: 0, sigma: 1),
  };
}

/// A class to hold the statistical properties of a vehicle vital.
class VitalStats {
  /// The importance of the vital in the overall eco-score calculation.
  final double weight;

  /// The population mean (ideal value for eco-driving).
  final double mu;

  /// The population standard deviation.
  final double sigma;

  /// Creates a new instance of [VitalStats].
  const VitalStats({
    required this.weight,
    required this.mu,
    required this.sigma,
  });

  /// Calculates the p-value for a two-tailed Z-test.
  /// The p-value represents the score.
  static double twoTailedZTestPValue(
    double sampleMean,
    double populationMean,
    double standardError,
  ) {
    if (standardError == 0) return 0;
    final zScore = (sampleMean - populationMean) / standardError;
    final pValue = 2 * (1 - _normalCdf(zScore.abs()));
    return pValue;
  }

  /// Calculates the p-value for a right-tailed Z-test.
  /// The p-value represents the score.
  static double rightTailedZTestPValue(
    double sampleMean,
    double populationMean,
    double standardError,
  ) {
    if (standardError == 0) return 0;
    final zScore = (sampleMean - populationMean) / standardError;
    final pValue = 1 - _normalCdf(zScore);
    return pValue;
  }

  /// Helper function to calculate the Cumulative Distribution Function (CDF)
  /// for a standard normal distribution (mean=0, stdDev=1).
  /// Uses the Abramowitz & Stegun approximation.
  static double _normalCdf(double x) {
    if (x < 0) {
      return 1 - _normalCdf(-x);
    }
    const double b1 = 0.319381530;
    const double b2 = -0.356563782;
    const double b3 = 1.781477937;
    const double b4 = -1.821255978;
    const double b5 = 1.330274429;
    const double p = 0.2316419;
    const double c2 = 0.39894228;

    final double t = 1.0 / (1.0 + p * x);
    final double b = c2 * exp(-x * x / 2.0);
    final double n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    return 1.0 - b * n;
  }

  /// Applies a weight to a given p-value (score).
  static double getWeightedScore(double pValue, double weight) {
    return pValue * weight;
  }

  /// Adjusts the weights of available vitals to ensure their sum is 1.
  ///
  /// If some vitals are unavailable, their weights are distributed equally
  /// among the available ones.
  static void adjustWeights(Map<String, bool> availableVitals) {
    double missingWeight = 0.0;
    int missingCount = 0;
    for (final entry in EcoscoreService.variables.entries) {
      if (availableVitals[entry.key] == false) {
        missingWeight += entry.value.weight;
        missingCount += 1;
      }
    }
    if (missingCount != 0) {
      final distrW =
          missingWeight / (EcoscoreService.variables.length - missingCount);
      for (final entry in EcoscoreService.variables.entries) {
        if (availableVitals[entry.key] == true) {
          EcoscoreService.variables[entry.key] = VitalStats(
            weight: entry.value.weight + distrW,
            mu: entry.value.mu,
            sigma: entry.value.sigma,
          );
        }
      }
    }
  }

  /// Calculates the final instant score by summing a list of weighted scores.
  static double getInstantScore(List<double> weightedScores) {
    if (weightedScores.isEmpty) return 0.0;
    return weightedScores.reduce((sum, score) => sum + score);
  }
}
