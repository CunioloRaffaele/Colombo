import 'dart:ui';

import 'package:flutter/material.dart';

Color getScoreColor(int score) {
  if (score >= 80) return Colors.green;
  if (score >= 60) return Colors.lightGreen;
  if (score >= 40) return Colors.yellow;
  if (score >= 20) return Colors.orange;
  return Colors.red;
}

Color getColorForScore(double score, dynamic viewModel) {
  if (!viewModel.isSessionActive) return Colors.blueGrey;
  if (score >= 80) return const Color(0xFF1EAE98);
  if (score >= 70) return Colors.limeAccent[700]!;
  if (score >= 40) return Colors.orangeAccent;
  return Colors.redAccent;
}
