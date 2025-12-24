import 'package:json_annotation/json_annotation.dart';

part 'reports_dto.g.dart';

@JsonSerializable()
class SessionsCounterDto {
  final int numeroSessioni;

  SessionsCounterDto({required this.numeroSessioni});

  factory SessionsCounterDto.fromJson(Map<String, dynamic> json) =>
      _$SessionsCounterDtoFromJson(json);
}

@JsonSerializable()
class GlobalEcoStatsDto {
  final double ecoscore;
  final int numeroSessioni;

  GlobalEcoStatsDto({required this.ecoscore, required this.numeroSessioni});

  factory GlobalEcoStatsDto.fromJson(Map<String, dynamic> json) =>
      _$GlobalEcoStatsDtoFromJson(json);
}

@JsonSerializable()
class MonthlyEcoStatsDto {
  final String message;
  final List<MonthlyEcoStatsSessionsDto>? sessioni;
  MonthlyEcoStatsDto({required this.message, this.sessioni});

  factory MonthlyEcoStatsDto.fromJson(Map<String, dynamic> json) =>
      _$MonthlyEcoStatsDtoFromJson(json);
}

@JsonSerializable()
class MonthlyEcoStatsSessionsDto {
  final int id;
  final String vettura;
  final String inizio;
  final double? km;
  final double? co2;
  final double? pm;
  final double? ecoscore;

  MonthlyEcoStatsSessionsDto({
    required this.id,
    required this.vettura,
    required this.inizio,
    this.km,
    this.co2,
    this.pm,
    this.ecoscore,
  });

  factory MonthlyEcoStatsSessionsDto.fromJson(Map<String, dynamic> json) =>
      _$MonthlyEcoStatsSessionsDtoFromJson(json);
}
