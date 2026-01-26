import 'dart:async';
import 'dart:math'; // Aggiungi questo import
import 'package:colombo/data/models/reports_dto.dart';
import 'package:colombo/data/services/reports_service.dart';
import 'package:colombo/data/services/tips_service.dart';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/material.dart';

class StatisticsViewModel extends ChangeNotifier {
  final TipsService _tipsService = TipsService();
  final ReportsService _reportsService = ReportsService();

  // Filters
  int _selectedYear = DateTime.now().year;
  int get selectedYear => _selectedYear;

  int _selectedMonthIndex = DateTime.now().month - 1;
  int get selectedMonthIndex => _selectedMonthIndex;

  final List<String> _months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];
  List<String> get months => _months;

  final List<int> _years = [2025, 2026];
  List<int> get years => _years;

  // Stats Data
  String _totalDrives = "0";
  String get totalDrives => _totalDrives;

  String _ecoScore = "0";
  String get ecoScore => _ecoScore;

  List<DrivingSession> _sessions = [];
  List<DrivingSession> get sessions => _sessions;

  // Tips Logic -  ValueNotifier
  final List<String> _tips = [];
  final ValueNotifier<int> currentTipIndexNotifier = ValueNotifier<int>(0);
  String getTip(int index) => _tips[index];

  Timer? _tipTimer;

  // --- Methods ---

  // Initialize data and timers
  void init() async {
    loadEcoTips();
    if (_tips.isNotEmpty) {
      currentTipIndexNotifier.value = Random().nextInt(_tips.length);
    } else {
      _tips.add(" ");
    }

    _startTipRotation();
    fetchStatistics();
  }

  // Cleanup
  @override
  void dispose() {
    _tipTimer?.cancel();
    currentTipIndexNotifier.dispose();
    super.dispose();
  }

  void setYear(int year) {
    _selectedYear = year;
    notifyListeners();
    fetchStatistics(); // Reload data for new filter
  }

  void setMonth(int index) {
    _selectedMonthIndex = index;
    notifyListeners();
    fetchStatistics(); // Reload data for new filter
  }

  void _startTipRotation() {
    _tipTimer = Timer.periodic(const Duration(seconds: 10), (timer) {
      currentTipIndexNotifier.value =
          (currentTipIndexNotifier.value + 1) % _tips.length;
    });
  }

  // --- API Calls ---

  Future<void> loadEcoTips() async {
    _tipsService.getEcoTips().then((fetchedTips) {
      _tips.addAll(fetchedTips);
    });
  }

  Future<void> fetchStatistics() async {
    notifyListeners();

    try {
      var sessionsDto = await _reportsService.getUserGlobalEcoStats();
      _totalDrives = sessionsDto.numeroSessioni.toString();
      _ecoScore = sessionsDto.ecoscore < 0
          ? "0"
          : sessionsDto.ecoscore.toStringAsFixed(2);
    } catch (e) {
      NotificationOverlay.show(
        "Errore nel caricamento delle statistiche: $e",
        Colors.red,
      );
    }

    try {
      var statisticsDto = await _reportsService.getUserMonthlyEcoStats(
        _selectedYear,
        _selectedMonthIndex + 1,
      );

      if (statisticsDto.sessioni == null) {
        _sessions = [];
        notifyListeners();
        return;
      }

      _sessions = List.generate(statisticsDto.sessioni!.length, (index) {
        final session = statisticsDto.sessioni![index];
        final dt = DateTime.fromMillisecondsSinceEpoch(
          int.parse(session.inizio) * 1000,
        );
        final hour = dt.hour > 12
            ? dt.hour - 12
            : (dt.hour == 0 ? 12 : dt.hour);
        final minute = dt.minute.toString().padLeft(2, '0');
        final period = dt.hour >= 12 ? 'pm' : 'am';
        final day = dt.day;
        final timeString = "$hour:$minute $period";

        return DrivingSession(
          id: "Sessione $index",
          date: " $day ${_months[_selectedMonthIndex]}, $timeString",
          distance: session.km != null
              ? "${session.km!.toStringAsFixed(2)} km"
              : " ",
          score: session.ecoscore != null && session.ecoscore! < 0
              ? 0
              : session.ecoscore!.round(),
          originalDto: session,
        );
      });

      // Ordina le sessioni per data (dalla più recente alla più vecchia)
      _sessions.sort((a, b) {
        final timeA = int.tryParse(a.originalDto.inizio) ?? 0;
        final timeB = int.tryParse(b.originalDto.inizio) ?? 0;
        return timeB.compareTo(timeA);
      });
    } catch (e) {
      NotificationOverlay.show(
        "Errore nel caricamento delle statistiche mensili: $e",
        Colors.red,
      );
    }

    notifyListeners();
  }
}

// Ui Model for a driving session
class DrivingSession {
  final String id;
  final String date;
  final String distance;
  final int score;
  final MonthlyEcoStatsSessionsDto originalDto;

  DrivingSession({
    required this.id,
    required this.date,
    required this.distance,
    required this.score,
    required this.originalDto,
  });
}
