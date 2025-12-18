import 'dart:math';
import 'package:stats/stats.dart';

/// A service class for calculating eco-driving scores.
class EcoscoreService {
  /// Defines the statistical properties and weights for various vehicle vitals.
  ///
  /// Each vital has:
  /// - `weight`: Its importance in the overall eco-score calculation.
  /// - `mu`: The population mean (ideal value for eco-driving).
  /// - `sigma`: The population standard deviation.
  static const Map<String, Map<String, double>> variables = {
    'rpm': {
      'weight': 0.22,
      'mu': 2200,
      'sigma': 500,
    },
    'speed': {
      'weight': 0.13,
      'mu': 80, // km/h
      'sigma': 20,
    },
    'throttlePosition': {
      'weight': 0.22,
      'mu': 30, // %
      'sigma': 15,
    },
    'coolantTemp': {
      'weight': 0.04,
      'mu': 90, // Celsius
      'sigma': 10,
    },
    'fuelRate': {
      'weight': 0.17,
      'mu': 3, // L/h - ideal low consumption rate
      'sigma': 2,
    },
    'engineExhaustFlow': {
      'weight': 0.09,
      'mu': 150, // g/s
      'sigma': 50,
    },
    'acceleration': {
      'weight': 0.13,
      'mu': 0, // m/s^2
      'sigma': 2,
    },
    // Vitals not directly related to driving style have a weight of 0.
    'odometer': {
      'weight': 0.0,
      'mu': 0,
      'sigma': 1,
    },
    'fuelTankLevel': {
      'weight': 0.0,
      'mu': 0,
      'sigma': 1,
    },
  };

  /// Calculates the p-value for a two-tailed Z-test.
  /// The p-value represents the score.
  static double twoTailedZTestPValue(
      double sampleMean, double populationMean, double standardError) {
    if (standardError == 0) return 0;
    final zScore = (sampleMean - populationMean) / standardError;
    final normal = Normal.fromMeanAndSd(0, 1);
    final pValue = 2 * (1 - normal.cdf(zScore.abs()));
    return pValue;
  }

  /// Calculates the p-value for a right-tailed Z-test.
  /// The p-value represents the score.
  static double rightTailedZTestPValue(
      double sampleMean, double populationMean, double standardError) {
    if (standardError == 0) return 0;
    final zScore = (sampleMean - populationMean) / standardError;
    final normal = Normal.fromMeanAndSd(0, 1);
    final pValue = 1 - normal.cdf(zScore);
    return pValue;
  }

  /// Applies a weight to a given p-value (score).
  static double getWeightedScore(double pValue, double weight) {
    return pValue * weight;
  }

  /// Calculates the final instant score by summing a list of weighted scores.
  static double getInstantScore(List<double> weightedScores) {
    if (weightedScores.isEmpty) return 0.0;
    return weightedScores.reduce((sum, score) => sum + score);
  }
}